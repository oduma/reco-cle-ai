import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        SettingsService,
      ],
    });
    service = TestBed.inject(SettingsService);
    http    = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('getSettings() calls GET /api/settings', () => {
    service.getSettings().subscribe();
    http.expectOne('/api/settings').flush({ settings: [] });
  });

  it('getSettings() returns the settings list', () => {
    const payload = { settings: [{ key: 'GEMINI_API_KEY', value: 'abc' }] };
    let received: { settings: { key: string; value: string | null }[] } | undefined;
    service.getSettings().subscribe(res => { received = res; });
    http.expectOne('/api/settings').flush(payload);
    expect(received?.settings.length).toBe(1);
    expect(received?.settings[0].key).toBe('GEMINI_API_KEY');
  });

  it('updateSettings() calls PUT /api/settings with the payload', () => {
    const req = { settings: { GEMINI_API_KEY: 'newkey' } };
    service.updateSettings(req).subscribe();
    const sent = http.expectOne('/api/settings');
    expect(sent.request.method).toBe('PUT');
    expect(sent.request.body).toEqual(req);
    sent.flush(null, { status: 204, statusText: 'No Content' });
  });

  it('updateSettings() with null value passes null in body', () => {
    const req = { settings: { GEMINI_API_KEY: null } };
    service.updateSettings(req).subscribe();
    const sent = http.expectOne('/api/settings');
    expect(sent.request.body.settings['GEMINI_API_KEY']).toBeNull();
    sent.flush(null, { status: 204, statusText: 'No Content' });
  });
});
