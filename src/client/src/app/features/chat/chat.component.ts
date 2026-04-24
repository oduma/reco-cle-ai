import { Component, signal, ViewChild, ElementRef, AfterViewChecked, OnDestroy, effect } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  RecommendationService,
  ConversationTurn,
  TrackSuggestion,
} from '../../core/services/recommendation.service';
import { SuggestionsPanelComponent } from './suggestions-panel/suggestions-panel.component';

interface Message {
  role: 'user' | 'model';
  text: string;
}

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
    MatIconModule,
    SuggestionsPanelComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements AfterViewChecked, OnDestroy {
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

  protected loadingPhrase = signal(LOADING_PHRASES[0]);

  private history: ConversationTurn[] = [];
  private shouldScroll = false;
  private loadingInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private recommendationService: RecommendationService) {
    effect(() => {
      if (this.loading()) {
        this.loadingPhrase.set(this.randomPhrase());
        this.loadingInterval = setInterval(() => {
          this.loadingPhrase.set(this.randomPhrase());
        }, 1000);
      } else {
        if (this.loadingInterval !== null) {
          clearInterval(this.loadingInterval);
          this.loadingInterval = null;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.loadingInterval !== null) clearInterval(this.loadingInterval);
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  protected send(): void {
    const text = this.prompt().trim();
    if (!text || this.loading()) return;

    this.messages.update(msgs => [...msgs, { role: 'user', text }]);
    this.prompt.set('');
    this.loading.set(true);
    this.error.set(null);
    this.errorIsRateLimit.set(false);
    this.shouldScroll = true;

    this.suggestionsLoading.set(true);
    this.suggestionsError.set(false);
    this.suggestionsMessage.set(null);
    this.hasSuggestions.set(true);

    this.recommendationService.getRecommendations(text, this.history).subscribe({
      next: response => {
        this.messages.update(msgs => [
          ...msgs,
          { role: 'model', text: response.narrative },
        ]);
        this.history = response.history;
        this.suggestions.set(response.suggestions);
        this.suggestionsMessage.set(response.message);
        this.loading.set(false);
        this.suggestionsLoading.set(false);
        this.shouldScroll = true;
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
    }
  }

  protected updatePrompt(event: Event): void {
    this.prompt.set((event.target as HTMLInputElement).value);
  }

  private randomPhrase(): string {
    return LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)];
  }

  private scrollToBottom(): void {
    const el = this.messageListRef?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
