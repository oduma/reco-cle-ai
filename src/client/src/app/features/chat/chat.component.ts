import { Component, computed, signal, ViewChild, ElementRef, AfterViewChecked, OnDestroy, OnInit, effect } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';
import {
  RecommendationService,
  TrackSuggestion,
  Provider,
} from '../../core/services/recommendation.service';
import { SessionService } from '../../core/services/session.service';
import { SuggestionsPanelComponent } from './suggestions-panel/suggestions-panel.component';
import { BoldMarkdownPipe } from '../../core/pipes/bold-markdown.pipe';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  eventId?: number;
  hasSuggestions?: boolean;
}

const PROVIDER_KEY = 'reco-provider';

const LOADING_PHRASES = [
  'Holding the note',
  'Staying on the downbeat',
  'Lingering in the intro',
  'Looping the pre‑chorus',
  'Riding the sustain pedal',
  'Tuning up forever',
  'Hovering on the fermata',
  'Chilling in the green room',
  'Stuck in soundcheck mode',
  'Spinning the vinyl before the needle drops',
  'Hanging on the last chord',
  'Paused between tracks',
  'Letting the beat simmer',
  'Idling in the bridge',
  'Waiting for the bass to kick in',
  'Floating in reverb',
  'Queued in the playlist',
  'Stuck in the encore gap',
  'Listening to the orchestra warm up',
  'Waiting for the DJ to unmute',
];

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    SuggestionsPanelComponent,
    BoldMarkdownPipe,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('messageList') private messageListRef!: ElementRef<HTMLElement>;

  protected messages = signal<Message[]>([]);
  protected prompt = signal('');
  protected loading = signal(false);
  protected error = signal<string | null>(null);
  protected errorIsRateLimit = signal(false);

  protected suggestions = signal<TrackSuggestion[]>([]);
  protected suggestionsLoading = signal(false);
  protected suggestionsError = signal(false);
  protected suggestionsMessage = signal<string | null>(null);
  protected hasSuggestions = signal(false);

  protected activeReplyId = signal<number | null>(null);

  protected loadingPhrase = signal(LOADING_PHRASES[0]);
  protected tryLineHint = signal('');

  protected provider = signal<Provider>(
    (localStorage.getItem(PROVIDER_KEY) as Provider) ?? 'gemini'
  );
  protected usedFallback = signal(false);

  protected memoryUsed  = signal(0);
  protected memoryTotal = signal(25);
  protected memoryFill  = computed(() =>
    this.memoryTotal() > 0 ? this.memoryUsed() / this.memoryTotal() : 0
  );
  protected memoryHigh  = computed(() => this.memoryFill() > 0.8);

  private shouldScroll = false;
  private typewriterTimeout: ReturnType<typeof setTimeout> | null = null;
  private fallbackTimer: ReturnType<typeof setTimeout> | null = null;

  // Prompt history (terminal-style up/down navigation)
  private readonly HISTORY_LIMIT = 50;
  private promptHistory: string[] = [];
  private historyIndex = -1;
  private currentDraft = '';

  protected isHintPreview = signal(false);

  constructor(
    private recommendationService: RecommendationService,
    private sessionService: SessionService,
  ) {
    effect(() => {
      if (this.loading()) {
        this.typewriterStart(this.randomPhrase());
      } else {
        this.typewriterStop();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.refreshMemory();
    try {
      const res = await fetch('/trylines.txt');
      const text = await res.text();
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length > 0) {
        this.tryLineHint.set(lines[Math.floor(Math.random() * lines.length)]);
      }
    } catch {
      // hint stays empty if asset unavailable
    }
    await this.hydrate();
  }

  ngOnDestroy(): void {
    this.typewriterStop();
    if (this.fallbackTimer !== null) clearTimeout(this.fallbackTimer);
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  protected setProvider(value: Provider): void {
    this.provider.set(value);
    localStorage.setItem(PROVIDER_KEY, value);
  }

  protected refreshMemory(): void {
    this.sessionService.getMemoryStatus().subscribe({
      next: s => {
        this.memoryUsed.set(s.used);
        this.memoryTotal.set(s.total);
      },
      error: () => {},
    });
  }

  protected bustMemory(): void {
    if (!confirm('Clear all session memory? The AI will start fresh on your next question.')) return;
    this.sessionService.bustMemory().subscribe({
      next: () => {
        this.memoryUsed.set(0);
        this.refreshMemory();
      },
      error: () => {},
    });
  }

  protected send(): void {
    const text = this.prompt().trim();
    if (!text || this.loading()) return;

    this.messages.update(msgs => [...msgs, { role: 'user', text, timestamp: new Date() }]);

    // Record in history, skipping consecutive duplicates
    if (this.promptHistory[this.promptHistory.length - 1] !== text) {
      this.promptHistory.push(text);
      if (this.promptHistory.length > this.HISTORY_LIMIT) this.promptHistory.shift();
    }
    this.historyIndex = -1;
    this.currentDraft = '';

    this.prompt.set('');
    this.loading.set(true);
    this.error.set(null);
    this.errorIsRateLimit.set(false);
    this.usedFallback.set(false);
    this.shouldScroll = true;

    this.suggestionsLoading.set(true);
    this.suggestionsError.set(false);
    this.suggestionsMessage.set(null);
    this.hasSuggestions.set(true);

    this.recommendationService.getRecommendations(text, this.provider()).subscribe({
      next: response => {
        this.activeReplyId.set(response.aiReplyEventId);
        this.messages.update(msgs => [
          ...msgs,
          {
            role: 'model',
            text: response.narrative,
            timestamp: new Date(),
            eventId: response.aiReplyEventId,
            hasSuggestions: response.suggestions.length > 0,
          },
        ]);
        this.suggestions.set(response.suggestions);
        this.suggestionsMessage.set(response.message);
        this.loading.set(false);
        this.suggestionsLoading.set(false);
        this.refreshMemory();
        this.shouldScroll = true;

        if (response.usedFallback) {
          this.usedFallback.set(true);
          if (this.fallbackTimer !== null) clearTimeout(this.fallbackTimer);
          this.fallbackTimer = setTimeout(() => this.usedFallback.set(false), 8000);
        }
      },
      error: err => {
        const isRateLimit = err.status === 429;
        this.errorIsRateLimit.set(isRateLimit);
        this.error.set(err.error?.error ?? 'Something went wrong. Please try again.');
        this.loading.set(false);
        this.suggestionsError.set(true);
        this.suggestionsLoading.set(false);
      },
    });
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
      return;
    }

    if (event.key === 'ArrowUp') {
      if (this.promptHistory.length === 0) return;
      event.preventDefault();
      if (this.historyIndex === -1) {
        this.currentDraft = this.isHintPreview() ? '' : this.prompt();
        this.isHintPreview.set(false);
      }
      this.historyIndex = this.historyIndex === -1
        ? this.promptHistory.length - 1
        : Math.max(0, this.historyIndex - 1);
      this.prompt.set(this.promptHistory[this.historyIndex]);
      return;
    }

    if (event.key === 'ArrowDown') {
      if (this.historyIndex === -1) return;
      event.preventDefault();
      this.historyIndex++;
      if (this.historyIndex >= this.promptHistory.length) {
        this.historyIndex = -1;
        this.prompt.set(this.currentDraft);
      } else {
        this.prompt.set(this.promptHistory[this.historyIndex]);
      }
      return;
    }
  }

  protected onFocus(event: FocusEvent): void {
    if (!this.prompt().trim() && this.tryLineHint()) {
      this.prompt.set(this.tryLineHint());
      this.isHintPreview.set(true);
    }
  }

  protected onBlur(): void {
    if (this.isHintPreview()) {
      this.prompt.set('');
      this.isHintPreview.set(false);
    }
  }

  protected updatePrompt(event: Event): void {
    this.historyIndex = -1;
    const inputEl = event.target as HTMLInputElement;

    if (this.isHintPreview()) {
      const ie = event as InputEvent;
      const inserted = ie.inputType?.startsWith('insert') ? (ie.data ?? '') : '';
      if (inserted) {
        this.isHintPreview.set(false);
        this.prompt.set(inserted);
        inputEl.value = inserted;
      } else {
        // backspace/delete on hint — restore hint unchanged
        inputEl.value = this.tryLineHint();
      }
      return;
    }

    const value = inputEl.value;
    if (value === '' && this.tryLineHint()) {
      this.prompt.set(this.tryLineHint());
      this.isHintPreview.set(true);
    } else {
      this.isHintPreview.set(false);
      this.prompt.set(value);
    }
  }

  protected formatMessageTime(ts: Date): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const hm = `${pad(ts.getHours())}:${pad(ts.getMinutes())}`;
    if (ts.toDateString() === now.toDateString()) return hm;
    return `${pad(ts.getDate())}/${pad(ts.getMonth() + 1)}/${ts.getFullYear()} ${hm}`;
  }

  protected activateReply(eventId: number): void {
    if (this.activeReplyId() === eventId) return;
    this.activeReplyId.set(eventId);
    this.hasSuggestions.set(true);
    this.suggestionsLoading.set(true);
    this.suggestionsError.set(false);

    this.sessionService.getEnrichedSuggestions(eventId).subscribe({
      next: enriched => {
        if (this.activeReplyId() !== eventId) return; // race guard
        this.suggestions.set(enriched.suggestions);
        this.suggestionsMessage.set(enriched.message);
        this.suggestionsLoading.set(false);
      },
      error: () => {
        if (this.activeReplyId() !== eventId) return;
        this.suggestionsLoading.set(false);
        this.suggestionsError.set(true);
      },
    });

    // fire-and-forget persistence
    this.sessionService.setActiveReply(eventId).subscribe({ error: () => {} });
  }

  private async hydrate(): Promise<void> {
    try {
      const history = await firstValueFrom(this.sessionService.getHistory());
      if (history.turns.length === 0) return;

      this.messages.set(history.turns.map(t => ({
        role: t.role,
        text: t.text,
        timestamp: new Date(t.timestamp),
        eventId: t.eventId,
        hasSuggestions: t.hasSuggestions,
      })));

      this.activeReplyId.set(history.activeReplyId);
      this.shouldScroll = true;

      if (history.activeReplyId != null) {
        this.hasSuggestions.set(true);
        this.suggestionsLoading.set(true);
        this.sessionService.getEnrichedSuggestions(history.activeReplyId).subscribe({
          next: enriched => {
            this.suggestions.set(enriched.suggestions);
            this.suggestionsMessage.set(enriched.message);
            this.suggestionsLoading.set(false);
          },
          error: () => { this.suggestionsLoading.set(false); },
        });
      }
    } catch {
      // silently fail — app works without history
    }
  }

  private typewriterStart(phrase: string): void {
    this.typewriterStop();
    this.typeChar(phrase, 0);
  }

  private typeChar(phrase: string, i: number): void {
    this.loadingPhrase.set(phrase.slice(0, i));
    if (i < phrase.length) {
      this.typewriterTimeout = setTimeout(() => this.typeChar(phrase, i + 1), 45);
    } else {
      this.typewriterTimeout = setTimeout(() => this.typewriterStart(this.randomPhrase()), 1000);
    }
  }

  private typewriterStop(): void {
    if (this.typewriterTimeout !== null) {
      clearTimeout(this.typewriterTimeout);
      this.typewriterTimeout = null;
    }
  }

  private randomPhrase(): string {
    return LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)];
  }

  private scrollToBottom(): void {
    const el = this.messageListRef?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
