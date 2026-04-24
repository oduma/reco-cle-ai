import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SuggestionCardComponent } from './suggestion-card/suggestion-card.component';
import { TrackSuggestion } from '../../../core/services/recommendation.service';

@Component({
  selector: 'app-suggestions-panel',
  standalone: true,
  imports: [MatIconModule, SuggestionCardComponent],
  templateUrl: './suggestions-panel.component.html',
  styleUrl: './suggestions-panel.component.scss',
})
export class SuggestionsPanelComponent {
  suggestions = input<TrackSuggestion[]>([]);
  loading = input(false);
  error = input(false);
  message = input<string | null>(null);
  loadingLabel = input<string>('Searching your library…');
}
