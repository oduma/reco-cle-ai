import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ChatComponent } from './chat.component';
import { RecommendationService, RecommendationResponse } from '../../core/services/recommendation.service';
import { SessionService } from '../../core/services/session.service';

const SESSION_SERVICE_STUB = {
  getMemoryStatus: () => of({ used: 0, total: 25 }),
  logTrackEvent: () => of(void 0),
  bustMemory: () => of(void 0),
};

const RECO_OK: RecommendationResponse = {
  narrative: 'Try Miles Davis.',
  suggestions: [],
  message: null,
  providerUsed: 'gemini',
  usedFallback: false,
};

const RECO_WITH_TRACKS: RecommendationResponse = {
  narrative: 'Try Blue in Green by Miles Davis.',
  suggestions: [{ title: 'Blue in Green', artist: 'Miles Davis', album: 'Kind of Blue', inLocalLibrary: false }],
  message: null,
  providerUsed: 'gemini',
  usedFallback: false,
};

describe('ChatComponent', () => {
  let fixture: ComponentFixture<ChatComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(
        'Try: "I have a glass of champagne in one hand and a book in the other. Turn on the music."\n' +
        'Try: "The lights are low, and I\'m reading. Match my mood."\n',
      ),
    }));
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
        RecommendationService,
        { provide: SessionService, useValue: SESSION_SERVICE_STUB },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
    vi.unstubAllGlobals();
  });

  function typeAndSend(text: string): void {
    const input = fixture.nativeElement.querySelector('input[matInput]') as HTMLInputElement;
    input.value = text;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('button[mat-fab]') as HTMLButtonElement).click();
    fixture.detectChanges();
  }

  function flush(body: RecommendationResponse = RECO_OK): void {
    httpMock.expectOne('/api/recommendations').flush(body);
  }

  it('shows empty state when no messages', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.empty-state')).toBeTruthy();
    expect(el.querySelector('.message')).toBeNull();
  });

  it('does not show suggestions panel before first send', () => {
    expect(fixture.nativeElement.querySelector('app-suggestions-panel')).toBeNull();
  });

  it('displays user message immediately after send', async () => {
    typeAndSend('recommend some jazz');
    await fixture.whenStable();

    const messages = fixture.nativeElement.querySelectorAll(
      '.message--user .message-bubble',
    ) as NodeListOf<HTMLElement>;
    expect(messages.length).toBe(1);
    expect(messages[0].textContent?.trim()).toContain('recommend some jazz');

    flush();
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('shows loading phrase while waiting for response', async () => {
    typeAndSend('any prompt');
    await fixture.whenStable();

    const loadingBubble = fixture.nativeElement.querySelector('.message-bubble--loading') as HTMLElement;
    expect(loadingBubble).toBeTruthy();
    expect(loadingBubble.querySelector('.loading-phrase')).toBeTruthy();

    flush();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.message-bubble--loading')).toBeNull();
  });

  it('displays narrative as AI response after successful reply', async () => {
    typeAndSend('jazz');
    flush(RECO_WITH_TRACKS);
    fixture.detectChanges();
    await fixture.whenStable();

    const modelMessages = fixture.nativeElement.querySelectorAll(
      '.message--model .message-bubble',
    ) as NodeListOf<HTMLElement>;
    expect(modelMessages.length).toBeGreaterThan(0);
    expect(modelMessages[modelMessages.length - 1].textContent?.trim()).toContain('Blue in Green');
  });

  it('shows suggestions panel with track cards after successful reply', async () => {
    typeAndSend('jazz');
    flush(RECO_WITH_TRACKS);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('app-suggestions-panel')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('app-suggestion-card').length).toBe(1);
  });

  it('shows error banner when the API call fails', async () => {
    typeAndSend('jazz');

    httpMock.expectOne('/api/recommendations').flush(
      { error: 'The AI service is temporarily unavailable. Please try again.' },
      { status: 502, statusText: 'Bad Gateway' },
    );
    fixture.detectChanges();
    await fixture.whenStable();

    const errorBanner = fixture.nativeElement.querySelector('.error-banner') as HTMLElement;
    expect(errorBanner).toBeTruthy();
    expect(errorBanner.textContent).toContain('temporarily unavailable');
  });

  it('clears the input field after sending', async () => {
    const input = fixture.nativeElement.querySelector('input[matInput]') as HTMLInputElement;
    typeAndSend('some prompt');
    await fixture.whenStable();

    expect(input.value).toBe('');

    flush();
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('prompt body contains no history field after Phase 8', async () => {
    typeAndSend('jazz');
    await fixture.whenStable();

    const req = httpMock.expectOne('/api/recommendations');
    expect(req.request.body.history).toBeUndefined();
    req.flush(RECO_OK);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  // ── Phase 7 ──────────────────────────────────────────────────────────────────

  it('renders three provider toggle buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('mat-button-toggle');
    expect(buttons.length).toBe(3);
    const labels = Array.from(buttons).map((b: any) => b.textContent?.trim());
    expect(labels).toContain('Inner Whisper');
    expect(labels).toContain('Inner Shout');
    expect(labels.some((l: any) => l?.includes('Cosmic Voice'))).toBe(true);
  });

  // ── Phase 6 ──────────────────────────────────────────────────────────────────

  it('shows updated empty state prompt text', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.empty-prompt')?.textContent?.trim())
      .toBe('What does your mind sound like today?');
  });

  it('shows a try-line hint in the empty state when trylines file loads', async () => {
    // Flush resolved-promise microtasks so ngOnInit's fetch chain settles
    await new Promise(resolve => setTimeout(resolve, 0));
    fixture.detectChanges();
    await fixture.whenStable();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.empty-hint')).toBeTruthy();
  });

  it('shows loading phrase in right panel when loading before first send', async () => {
    (fixture.componentInstance as any).loading.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const rightPanel = fixture.nativeElement.querySelector('.pane--reco') as HTMLElement;
    expect(rightPanel.querySelector('.reco-loading-text')).toBeTruthy();
    expect(rightPanel.querySelector('.reco-empty-state p:not(.reco-loading-text)')).toBeNull();
  });
});
