import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideZonelessChangeDetection } from '@angular/core';
import { SuggestionsPanelComponent } from './suggestions-panel.component';
import { TrackSuggestion } from '../../../core/services/recommendation.service';

const SAMPLE_TRACKS: TrackSuggestion[] = [
  { title: 'Blue in Green', artist: 'Miles Davis', album: 'Kind of Blue' },
  { title: 'A Love Supreme', artist: 'John Coltrane', album: null },
];

describe('SuggestionsPanelComponent', () => {
  let fixture: ComponentFixture<SuggestionsPanelComponent>;

  async function setup(inputs: Partial<{
    suggestions: TrackSuggestion[];
    loading: boolean;
    error: boolean;
    message: string | null;
  }> = {}) {
    await TestBed.configureTestingModule({
      imports: [SuggestionsPanelComponent],
      providers: [provideZonelessChangeDetection(), provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestionsPanelComponent);
    fixture.componentRef.setInput('suggestions', inputs.suggestions ?? []);
    fixture.componentRef.setInput('loading', inputs.loading ?? false);
    fixture.componentRef.setInput('error', inputs.error ?? false);
    fixture.componentRef.setInput('message', inputs.message ?? null);
    fixture.detectChanges();
    await fixture.whenStable();
  }

  it('renders a card for each suggestion', async () => {
    await setup({ suggestions: SAMPLE_TRACKS });
    const cards = fixture.nativeElement.querySelectorAll('app-suggestion-card');
    expect(cards.length).toBe(2);
  });

  it('shows loading state when loading with no suggestions', async () => {
    await setup({ loading: true, suggestions: [] });
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.panel-state--loading')).toBeTruthy();
    expect(el.querySelector('app-suggestion-card')).toBeNull();
  });

  it('shows error state when error is true', async () => {
    await setup({ error: true });
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.panel-state--error')).toBeTruthy();
  });

  it('shows empty message when suggestions are empty and message is provided', async () => {
    await setup({ suggestions: [], message: 'No tracks found.' });
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.panel-state--empty')?.textContent).toContain('No tracks found.');
  });

  it('shows suggestion title, artist, and album when all are present', async () => {
    await setup({ suggestions: [SAMPLE_TRACKS[0]] });
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.track-title')?.textContent?.trim()).toBe('Blue in Green');
    expect(el.querySelector('.track-artist')?.textContent?.trim()).toBe('Miles Davis');
    expect(el.querySelector('.track-album')?.textContent?.trim()).toBe('Kind of Blue');
  });

  it('does not render album element when album is null', async () => {
    await setup({ suggestions: [SAMPLE_TRACKS[1]] });
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.track-album')).toBeNull();
  });
});
