import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TrackSuggestion } from '../../../../core/services/recommendation.service';

@Component({
  selector: 'app-suggestion-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './suggestion-card.component.html',
  styleUrl: './suggestion-card.component.scss',
})
export class SuggestionCardComponent {
  suggestion = input.required<TrackSuggestion>();

  youtubeUrl = computed(() => {
    const q = encodeURIComponent(`${this.suggestion().artist} ${this.suggestion().title}`);
    return `https://www.youtube.com/results?search_query=${q}`;
  });
}
