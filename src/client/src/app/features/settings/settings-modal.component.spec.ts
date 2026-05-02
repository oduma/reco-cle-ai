import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { vi } from 'vitest';
import { SettingsModalComponent } from './settings-modal.component';
import { SettingsService } from '../../core/services/settings.service';

describe('SettingsModalComponent', () => {
  let fixture: ComponentFixture<SettingsModalComponent>;
  let component: SettingsModalComponent;
  let http: HttpTestingController;
  let closeSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    closeSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [SettingsModalComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
        SettingsService,
        { provide: MatDialogRef, useValue: { close: closeSpy } },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(SettingsModalComponent);
    component = fixture.componentInstance;
    http      = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('shows spinner while loading', () => {
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
    http.expectOne('/api/settings').flush({ settings: [] });
  });

  it('pre-populates form fields from API response', async () => {
    fixture.detectChanges();
    http.expectOne('/api/settings').flush({
      settings: [{ key: 'GEMINI_API_KEY', value: 'abc123' }],
    });
    await fixture.whenStable();
    fixture.detectChanges();

    const geminiKeyCtrl = (component as any).form.get('GEMINI_API_KEY');
    expect(geminiKeyCtrl?.value).toBe('abc123');
  });

  it('hides spinner after load', async () => {
    fixture.detectChanges();
    http.expectOne('/api/settings').flush({ settings: [] });
    await fixture.whenStable();
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeFalsy();
  });

  it('cancel() closes dialog with false', async () => {
    fixture.detectChanges();
    http.expectOne('/api/settings').flush({ settings: [] });
    await fixture.whenStable();

    (component as any).cancel();
    expect(closeSpy).toHaveBeenCalledWith(false);
  });

  it('save() sends PUT with form values and closes with true', async () => {
    fixture.detectChanges();
    http.expectOne('/api/settings').flush({ settings: [] });
    await fixture.whenStable();

    (component as any).form.get('GEMINI_API_KEY')?.setValue('newkey');
    (component as any).save();

    const req = http.expectOne('/api/settings');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.settings['GEMINI_API_KEY']).toBe('newkey');
    req.flush(null, { status: 204, statusText: 'No Content' });

    await fixture.whenStable();
    expect(closeSpy).toHaveBeenCalledWith(true);
  });

  it('save() sends null for blank fields', async () => {
    fixture.detectChanges();
    http.expectOne('/api/settings').flush({
      settings: [{ key: 'GEMINI_API_KEY', value: 'oldkey' }],
    });
    await fixture.whenStable();

    (component as any).form.get('GEMINI_API_KEY')?.setValue('');
    (component as any).save();

    const req = http.expectOne('/api/settings');
    expect(req.request.body.settings['GEMINI_API_KEY']).toBeNull();
    req.flush(null, { status: 204, statusText: 'No Content' });
  });

  it('shows error message when save fails', async () => {
    fixture.detectChanges();
    http.expectOne('/api/settings').flush({ settings: [] });
    await fixture.whenStable();

    (component as any).save();
    http.expectOne('/api/settings').flush(null, { status: 500, statusText: 'Error' });
    await fixture.whenStable();
    fixture.detectChanges();

    expect((component as any).saveError()).not.toBeNull();
  });
});
