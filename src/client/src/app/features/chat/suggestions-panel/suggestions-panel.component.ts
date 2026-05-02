import { Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuggestionCardComponent } from './suggestion-card/suggestion-card.component';
import { TrackSuggestion } from '../../../core/services/recommendation.service';
import { PlaylistService } from '../../../core/services/playlist.service';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-suggestions-panel',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, SuggestionCardComponent],
  templateUrl: './suggestions-panel.component.html',
  styleUrl: './suggestions-panel.component.scss',
})
export class SuggestionsPanelComponent {
  suggestions = input<TrackSuggestion[]>([]);
  loading = input(false);
  error = input(false);
  message = input<string | null>(null);
  loadingLabel = input<string>('Searching your library…');

  addingAll = signal(false);

  localTracks = computed(() =>
    this.suggestions().filter(s => s.inLocalLibrary && s.filePath)
  );

  localFilePaths = computed(() => this.localTracks().map(s => s.filePath!));

  constructor(
    private playlistService: PlaylistService,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
  ) {}

  addAllToClementine(): void {
    const tracks = this.localTracks();
    const paths  = this.localFilePaths();
    if (paths.length === 0 || this.addingAll()) return;

    this.addingAll.set(true);
    this.playlistService.addToPlaylist(paths).subscribe({
      next: () => {
        this.snackBar.open(`Added ${paths.length} track(s) to Clementine`, undefined, { duration: 2500 });
        this.addingAll.set(false);
        for (const t of tracks) {
          this.sessionService.logTrackEvent('track-added', t.artist, t.album ?? null, t.title, t.durationSeconds ?? null)
            .subscribe({ error: () => {} });
        }
      },
      error: () => {
        this.snackBar.open('Could not add tracks to Clementine', 'Dismiss', { duration: 4000 });
        this.addingAll.set(false);
      },
    });
  }
}
