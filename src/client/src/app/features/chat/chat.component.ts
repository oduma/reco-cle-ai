import { Component, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    SuggestionsPanelComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements AfterViewChecked {
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

  private history: ConversationTurn[] = [];
  private shouldScroll = false;

  constructor(private recommendationService: RecommendationService) {}

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

  private scrollToBottom(): void {
    const el = this.messageListRef?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
