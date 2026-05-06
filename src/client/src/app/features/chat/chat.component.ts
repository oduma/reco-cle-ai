import { Component, computed, signal, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, OnDestroy, OnInit, effect, HostListener, NgZone } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom, retry, throwError, timer } from 'rxjs';
import {
  RecommendationService,
  TrackSuggestion,
  Provider,
} from '../../core/services/recommendation.service';
import { SessionService } from '../../core/services/session.service';
import { SettingsService } from '../../core/services/settings.service';
import { GeoWeatherService } from '../../core/services/geo-weather.service';
import { SettingsModalComponent } from '../settings/settings-modal.component';
import { MusicalDiaryModalComponent } from '../diary/musical-diary-modal/musical-diary-modal.component';
import { SuggestionsPanelComponent } from './suggestions-panel/suggestions-panel.component';
import { MoodPickerComponent } from './mood-picker/mood-picker.component';
import { BoldMarkdownPipe } from '../../core/pipes/bold-markdown.pipe';
import { Mood } from '../../core/models/mood';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  eventId?: number;
  hasSuggestions?: boolean;
  mood?: Mood;
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

// Minimum right-pane width so at least one card is always visible
const ONE_CARD_MIN_PX = 220;
const SPLIT_MIN_PCT   = 25;

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    SuggestionsPanelComponent,
    MoodPickerComponent,
    BoldMarkdownPipe,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('messageList')    private messageListRef!: ElementRef<HTMLElement>;
  @ViewChild('promptInput')    private promptInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('splitContainer') private containerRef!: ElementRef<HTMLElement>;

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
  protected retryNotice = signal<string | null>(null);

  // Show More / Show Less bubble truncation
  protected truncatedBubbles = signal<Set<number>>(new Set());
  protected expandedBubbles  = signal<Set<number>>(new Set());
  private   bubbleNaturalHeights = new Map<number, number>();
  private   resizeObserver?: ResizeObserver;
  private   pendingMeasure = false;

  protected loadingPhrase = signal(LOADING_PHRASES[0]);
  protected tryLineHint = signal('');

  protected provider = signal<Provider>(
    (localStorage.getItem(PROVIDER_KEY) as Provider) ?? 'gemini'
  );
  protected usedFallback = signal(false);

  private useLocation = signal(false);
  private useWeather  = signal(false);

  protected memoryUsed  = signal(0);
  protected memoryTotal = signal(25);
  protected memoryFill  = computed(() =>
    this.memoryTotal() > 0 ? this.memoryUsed() / this.memoryTotal() : 0
  );
  protected memoryHigh  = computed(() => this.memoryFill() > 0.8);

  // Split-pane divider
  protected splitPercent = signal(40);
  private dragging = false;
  private containerWidth = 0;

  // Derived from the server message: true when Clementine DB is unavailable
  protected clementineUnavailable = computed(() =>
    this.suggestionsMessage()?.includes('local library is currently unavailable') === true
  );

  private shouldScroll = false;
  private shouldFocusInput = false;
  private typewriterTimeout: ReturnType<typeof setTimeout> | null = null;
  private fallbackTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly RETRY_DELAYS = [3000, 5000, 7000, 10000];

  // Prompt history (terminal-style up/down navigation)
  private readonly HISTORY_LIMIT = 50;
  private promptHistory: string[] = [];
  private historyIndex = -1;
  private currentDraft = '';

  protected isHintPreview = signal(false);

  constructor(
    private recommendationService: RecommendationService,
    private sessionService: SessionService,
    private settingsService: SettingsService,
    protected geoWeatherService: GeoWeatherService,
    private dialog: MatDialog,
    private ngZone: NgZone,
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
    this.loadEnvSettings();
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

  ngAfterViewInit(): void {
    this.focusPromptInput();
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() =>
        this.ngZone.run(() => this.recomputeTruncation()));
      const el = this.messageListRef?.nativeElement;
      if (el) this.resizeObserver.observe(el);
    }
  }

  ngOnDestroy(): void {
    this.typewriterStop();
    if (this.fallbackTimer !== null) clearTimeout(this.fallbackTimer);
    this.resizeObserver?.disconnect();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
    if (this.shouldFocusInput) {
      this.shouldFocusInput = false;
      setTimeout(() => this.promptInputRef?.nativeElement?.focus(), 0);
    }
    if (!this.pendingMeasure) {
      this.pendingMeasure = true;
      Promise.resolve().then(() => {
        this.pendingMeasure = false;
        this.measureNewBubbles();
      });
    }
  }

  // ── Divider drag ─────────────────────────────────────────────────────────────

  protected onDividerMousedown(event: MouseEvent): void {
    this.dragging = true;
    this.containerWidth = this.containerRef?.nativeElement?.getBoundingClientRect().width ?? 0;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.dragging || this.containerWidth === 0) return;
    const rect   = this.containerRef.nativeElement.getBoundingClientRect();
    const rawPct = ((event.clientX - rect.left) / this.containerWidth) * 100;
    const maxPct = ((this.containerWidth - ONE_CARD_MIN_PX) / this.containerWidth) * 100;
    this.splitPercent.set(Math.min(Math.max(rawPct, SPLIT_MIN_PCT), maxPct));
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.dragging = false;
  }

  // ── Existing methods ──────────────────────────────────────────────────────────

  private loadEnvSettings(): void {
    this.settingsService.getSettings().subscribe({
      next: resp => {
        const find = (key: string) =>
          resp.settings.find(s => s.key === key)?.value ?? 'false';
        this.useLocation.set(find('USE_USER_LOCATION') === 'true');
        this.useWeather.set(find('USE_CURRENT_WEATHER') === 'true');
      },
      error: () => {},
    });
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

  protected openSettings(): void {
    this.dialog.open(SettingsModalComponent, {
      disableClose: false,
      autoFocus: false,
    }).afterClosed().subscribe(saved => {
      if (saved) {
        const stored = localStorage.getItem(PROVIDER_KEY) as Provider;
        if (stored) this.provider.set(stored);
        this.loadEnvSettings();
      }
    });
  }

  protected openDiary(): void {
    this.dialog.open(MusicalDiaryModalComponent, {
      disableClose: false,
      autoFocus: false,
      maxWidth: '96vw',
      data: { provider: this.provider() },
    });
  }

  protected isTruncated(index: number): boolean {
    return this.truncatedBubbles().has(index) && !this.expandedBubbles().has(index);
  }

  protected showToggle(index: number): boolean {
    return this.truncatedBubbles().has(index);
  }

  protected toggleExpand(index: number): void {
    this.expandedBubbles.update(s => {
      const next = new Set(s);
      if (next.has(index)) next.delete(index); else next.add(index);
      return next;
    });
  }

  protected send(): void {
    const text = this.prompt().trim();
    if (!text || this.loading()) return;

    if (this.promptHistory[this.promptHistory.length - 1] !== text) {
      this.promptHistory.push(text);
      if (this.promptHistory.length > this.HISTORY_LIMIT) this.promptHistory.shift();
    }
    this.historyIndex = -1;
    this.currentDraft = '';

    this.prompt.set('');
    this._executeRequest(text, 'normal');
  }

  protected onMoodSelected(mood: Mood, msg: Message): void {
    if (mood === (msg.mood ?? 'normal')) return;
    this.resendWithMood(msg.text, mood);
  }

  protected resendWithMood(originalText: string, mood: Mood): void {
    if (this.loading()) return;
    this._executeRequest(originalText, mood);
  }

  private _executeRequest(displayText: string, mood: Mood): void {
    this.messages.update(msgs => [...msgs, { role: 'user', text: displayText, timestamp: new Date(), mood }]);

    this.loading.set(true);
    this.error.set(null);
    this.errorIsRateLimit.set(false);
    this.retryNotice.set(null);
    this.usedFallback.set(false);
    this.shouldScroll = true;

    this.suggestionsLoading.set(true);
    this.suggestionsError.set(false);
    this.suggestionsMessage.set(null);
    this.hasSuggestions.set(true);

    const locationCtx = this.useLocation() ? this.geoWeatherService.locationContext() : null;
    const weatherCtx  = this.useWeather()  ? this.geoWeatherService.weatherContext()  : null;

    this.recommendationService.getRecommendations(displayText, this.provider(), mood, locationCtx, weatherCtx).pipe(
      retry({
        count: 4,
        delay: (err, retryCount) => {
          if (!this.isRetryableError(err)) return throwError(() => err);
          this.retryNotice.set(`The AI is a bit busy right now… retrying (${retryCount}/4)`);
          return timer(this.RETRY_DELAYS[retryCount - 1]);
        },
      }),
    ).subscribe({
      next: response => {
        this.retryNotice.set(null);
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
        this.focusPromptInput();

        if (response.usedFallback) {
          this.usedFallback.set(true);
          if (this.fallbackTimer !== null) clearTimeout(this.fallbackTimer);
          this.fallbackTimer = setTimeout(() => this.usedFallback.set(false), 8000);
        }
      },
      error: err => {
        this.retryNotice.set(null);
        const isRateLimit = err.status === 429;
        this.errorIsRateLimit.set(isRateLimit);
        this.error.set(err.error?.error ?? 'Something went wrong. Please try again.');
        this.loading.set(false);
        this.suggestionsError.set(true);
        this.suggestionsLoading.set(false);
        this.focusPromptInput();
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
        if (this.activeReplyId() !== eventId) return;
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

    this.sessionService.setActiveReply(eventId).subscribe({ error: () => {} });
  }

  private async hydrate(): Promise<void> {
    try {
      const history = await firstValueFrom(this.sessionService.getHistory());
      if (history.turns.length === 0) return;

      this.bubbleNaturalHeights.clear();
      this.truncatedBubbles.set(new Set());
      this.expandedBubbles.set(new Set());

      this.messages.set(history.turns.map(t => ({
        role: t.role,
        text: t.text,
        timestamp: new Date(t.timestamp),
        eventId: t.eventId,
        hasSuggestions: t.hasSuggestions,
        mood: (t.mood ?? 'normal') as Mood,
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

  private focusPromptInput(): void {
    this.shouldFocusInput = true;
  }

  // Only 502 (gateway busy / AI overloaded) is treated as transient and retried.
  private isRetryableError(err: unknown): boolean {
    return (err as { status?: number })?.status === 502;
  }

  private measureNewBubbles(): void {
    const listEl = this.messageListRef?.nativeElement;
    if (!listEl) return;
    const threshold = window.innerHeight * 0.5;
    let changed = false;

    listEl.querySelectorAll<HTMLElement>('[data-msg-index]').forEach(el => {
      const idx = parseInt(el.dataset['msgIndex'] ?? '-1', 10);
      if (idx < 0 || this.bubbleNaturalHeights.has(idx)) return;
      this.bubbleNaturalHeights.set(idx, el.scrollHeight);
      changed = true;
    });

    if (changed) this.recomputeTruncation(threshold);
  }

  private recomputeTruncation(threshold = window.innerHeight * 0.5): void {
    const msgs = this.messages();
    const truncated = new Set<number>();
    for (const [idx, h] of this.bubbleNaturalHeights) {
      if (idx < msgs.length && msgs[idx].role === 'model' && h > threshold) {
        truncated.add(idx);
      }
    }
    const current = this.truncatedBubbles();
    if (!ChatComponent.setsEqual(truncated, current)) {
      this.truncatedBubbles.set(truncated);
    }
  }

  private static setsEqual(a: Set<number>, b: Set<number>): boolean {
    if (a.size !== b.size) return false;
    for (const v of a) if (!b.has(v)) return false;
    return true;
  }

  private scrollToBottom(): void {
    const el = this.messageListRef?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
