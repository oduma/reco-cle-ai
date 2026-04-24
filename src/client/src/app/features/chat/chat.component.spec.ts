import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideZonelessChangeDetection } from '@angular/core';
import { ChatComponent } from './chat.component';
import { ChatService } from '../../core/services/chat.service';

describe('ChatComponent', () => {
  let fixture: ComponentFixture<ChatComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
        ChatService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => httpMock.verify());

  it('shows empty state when no messages', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.empty-state')).toBeTruthy();
    expect(el.querySelector('.message')).toBeNull();
  });

  it('displays user message immediately after send', async () => {
    const input = fixture.nativeElement.querySelector('input[matInput]') as HTMLInputElement;
    input.value = 'recommend some jazz';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('button[mat-fab]') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    const messages = fixture.nativeElement.querySelectorAll('.message--user .message-bubble') as NodeListOf<HTMLElement>;
    expect(messages.length).toBe(1);
    expect(messages[0].textContent?.trim()).toBe('recommend some jazz');

    httpMock.expectOne('/api/chat').flush({ response: 'Try Miles Davis.', history: [] });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('shows loading spinner while waiting for response', async () => {
    const input = fixture.nativeElement.querySelector('input[matInput]') as HTMLInputElement;
    input.value = 'any prompt';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('button[mat-fab]') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('mat-spinner')).toBeTruthy();

    httpMock.expectOne('/api/chat').flush({ response: 'ok', history: [] });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('mat-spinner')).toBeNull();
  });

  it('displays AI response after successful reply', async () => {
    const input = fixture.nativeElement.querySelector('input[matInput]') as HTMLInputElement;
    input.value = 'jazz';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('button[mat-fab]') as HTMLButtonElement).click();
    fixture.detectChanges();

    httpMock.expectOne('/api/chat').flush({
      response: 'Try Miles Davis – Kind of Blue.',
      history: [
        { role: 'user', text: 'jazz' },
        { role: 'model', text: 'Try Miles Davis – Kind of Blue.' },
      ],
    });
    fixture.detectChanges();
    await fixture.whenStable();

    const modelMessages = fixture.nativeElement.querySelectorAll('.message--model .message-bubble') as NodeListOf<HTMLElement>;
    expect(modelMessages.length).toBeGreaterThan(0);
    const lastBubble = modelMessages[modelMessages.length - 1];
    expect(lastBubble.textContent?.trim()).toContain('Miles Davis');
  });

  it('shows error banner when the API call fails', async () => {
    const input = fixture.nativeElement.querySelector('input[matInput]') as HTMLInputElement;
    input.value = 'jazz';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('button[mat-fab]') as HTMLButtonElement).click();
    fixture.detectChanges();

    httpMock.expectOne('/api/chat').flush(
      { error: 'The AI service is temporarily unavailable. Please try again.' },
      { status: 502, statusText: 'Bad Gateway' }
    );
    fixture.detectChanges();
    await fixture.whenStable();

    const errorBanner = fixture.nativeElement.querySelector('.error-banner') as HTMLElement;
    expect(errorBanner).toBeTruthy();
    expect(errorBanner.textContent).toContain('temporarily unavailable');
  });

  it('clears the input field after sending', async () => {
    const input = fixture.nativeElement.querySelector('input[matInput]') as HTMLInputElement;
    input.value = 'some prompt';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('button[mat-fab]') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.value).toBe('');

    httpMock.expectOne('/api/chat').flush({ response: 'ok', history: [] });
    fixture.detectChanges();
    await fixture.whenStable();
  });
});
