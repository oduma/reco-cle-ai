import { Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrackSuggestion } from '../../../../core/services/recommendation.service';
import { PlaylistService } from '../../../../core/services/playlist.service';
import { SessionService } from '../../../../core/services/session.service';

@Component({
  selector: 'app-suggestion-card',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './suggestion-card.component.html',
  styleUrl: './suggestion-card.component.scss',
})
export class SuggestionCardComponent {
  suggestion = input.required<TrackSuggestion>();
  addingToPlaylist = signal(false);
  artFailed = signal(false);

  hasArt = computed(() => !!this.suggestion().albumArtUrl && !this.artFailed());

  youtubeUrl = computed(() => {
    const q = encodeURIComponent(`${this.suggestion().artist} ${this.suggestion().title}`);
    return `https://www.youtube.com/results?search_query=${q}`;
  });

  constructor(
    private snackBar: MatSnackBar,
    private playlistService: PlaylistService,
    private sessionService: SessionService,
  ) {}

  onArtError(): void {
    this.artFailed.set(true);
  }

  copyToClipboard(): void {
    const s = this.suggestion();
    const text = `${s.artist} – ${s.title}`;
    navigator.clipboard.writeText(text).then(
      () => this.snackBar.open(`Copied: ${text}`, undefined, { duration: 2000 }),
      () => this.snackBar.open('Could not copy to clipboard', 'Dismiss', { duration: 4000 }),
    );
  }

  onYouTubeClick(): void {
    const s = this.suggestion();
    this.sessionService.logTrackEvent('track-youtube', s.artist, s.album ?? null, s.title, s.durationSeconds ?? null)
      .subscribe({ error: () => {} });
  }

  addToClementine(): void {
    const s = this.suggestion();
    if (!s.filePath || this.addingToPlaylist()) return;

    this.addingToPlaylist.set(true);
    this.playlistService.addToPlaylist([s.filePath]).subscribe({
      next: () => {
        this.snackBar.open(`Added to Clementine: ${s.artist} – ${s.title}`, undefined, { duration: 2000 });
        this.addingToPlaylist.set(false);
        this.sessionService.logTrackEvent('track-added', s.artist, s.album ?? null, s.title, s.durationSeconds ?? null)
          .subscribe({ error: () => {} });
      },
      error: () => {
        this.snackBar.open('Could not add to Clementine playlist', 'Dismiss', { duration: 4000 });
        this.addingToPlaylist.set(false);
      },
    });
  }
}
