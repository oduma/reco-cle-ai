import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { vi } from 'vitest';
import { MusicalDiaryModalComponent } from './musical-diary-modal.component';
import { DiaryService } from '../../../core/services/diary.service';

describe('MusicalDiaryModalComponent', () => {
  let fixture: ComponentFixture<MusicalDiaryModalComponent>;
  let component: MusicalDiaryModalComponent;
  let http: HttpTestingController;
  let closeSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    closeSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [MusicalDiaryModalComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
        DiaryService,
        { provide: MatDialogRef, useValue: { close: closeSpy } },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(MusicalDiaryModalComponent);
    component = fixture.componentInstance;
    http      = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('fetches active dates on init', () => {
    fixture.detectChanges();
    const req = http.expectOne('/api/diary/active-dates');
    expect(req.request.method).toBe('GET');
    req.flush(['2025-04-01', '2025-04-15']);
  });

  it('shows calendar after dates load', async () => {
    fixture.detectChanges();
    http.expectOne('/api/diary/active-dates').flush(['2025-04-01']);
    await fixture.whenStable();
    fixture.detectChanges();

    const calendar = fixture.nativeElement.querySelector('mat-calendar');
    expect(calendar).toBeTruthy();
  });

  it('shows empty-state prompt when no date is selected', async () => {
    fixture.detectChanges();
    http.expectOne('/api/diary/active-dates').flush([]);
    await fixture.whenStable();
    fixture.detectChanges();

    const emptyState = fixture.nativeElement.querySelector('.entry-empty');
    expect(emptyState).toBeTruthy();
  });

  it('calls close on MatDialogRef when close() is invoked', async () => {
    fixture.detectChanges();
    http.expectOne('/api/diary/active-dates').flush([]);

    (component as any).close();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('shows spinner while loading an entry', async () => {
    fixture.detectChanges();
    http.expectOne('/api/diary/active-dates').flush(['2025-04-01']);
    await fixture.whenStable();
    fixture.detectChanges();

    // Simulate selecting an active date
    (component as any).activeDates.set(new Set(['2025-04-01']));
    (component as any).selectedDate.set(new Date('2025-04-01T12:00:00Z'));
    (component as any).entryLoading.set(true);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.entry-loading mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('shows diary entry content when loaded', async () => {
    fixture.detectChanges();
    http.expectOne('/api/diary/active-dates').flush(['2025-04-01']);
    await fixture.whenStable();

    (component as any).activeDates.set(new Set(['2025-04-01']));
    (component as any).selectedDate.set(new Date('2025-04-01T12:00:00Z'));
    (component as any).entryContent.set('Today the music spoke of solitude.');
    (component as any).entryLoading.set(false);
    fixture.detectChanges();

    const entryText = fixture.nativeElement.querySelector('.entry-text');
    expect(entryText?.textContent?.trim()).toBe('Today the music spoke of solitude.');
  });

  it('shows error state when entry load fails', async () => {
    fixture.detectChanges();
    http.expectOne('/api/diary/active-dates').flush([]);
    await fixture.whenStable();

    (component as any).selectedDate.set(new Date('2025-04-01T12:00:00Z'));
    (component as any).entryError.set('Could not generate your diary entry. Please try again.');
    (component as any).entryLoading.set(false);
    fixture.detectChanges();

    const errorEl = fixture.nativeElement.querySelector('.entry-error');
    expect(errorEl).toBeTruthy();
  });

  it('shows cache badge when entry is from cache', async () => {
    fixture.detectChanges();
    http.expectOne('/api/diary/active-dates').flush(['2025-04-01']);
    await fixture.whenStable();

    (component as any).selectedDate.set(new Date('2025-04-01T12:00:00Z'));
    (component as any).entryContent.set('Cached entry prose.');
    (component as any).isFromCache.set(true);
    (component as any).entryLoading.set(false);
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.cache-badge');
    expect(badge).toBeTruthy();
  });

  it('does not show cache badge for freshly generated entries', async () => {
    fixture.detectChanges();
    http.expectOne('/api/diary/active-dates').flush(['2025-04-01']);
    await fixture.whenStable();

    (component as any).selectedDate.set(new Date('2025-04-01T12:00:00Z'));
    (component as any).entryContent.set('Fresh prose.');
    (component as any).isFromCache.set(false);
    (component as any).entryLoading.set(false);
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.cache-badge');
    expect(badge).toBeNull();
  });
});
