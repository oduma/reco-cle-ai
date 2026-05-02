import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { SessionService, MemoryStatus } from './session.service';

describe('SessionService', () => {
  let service: SessionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), SessionService],
    });
    service = TestBed.inject(SessionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  describe('logTrackEvent', () => {
    it('POSTs track-added to /api/session/events with correct fields', () => {
      service.logTrackEvent('track-added', 'Miles Davis', 'Kind of Blue', 'So What', 564).subscribe();

      const req = httpMock.expectOne('/api/session/events');
      expect(req.request.method).toBe('POST');
      expect(req.request.body.eventType).toBe('track-added');
      expect(req.request.body.artist).toBe('Miles Davis');
      expect(req.request.body.album).toBe('Kind of Blue');
      expect(req.request.body.title).toBe('So What');
      expect(req.request.body.durationSeconds).toBe(564);
      req.flush(null, { status: 204, statusText: 'No Content' });
    });

    it('POSTs track-youtube to /api/session/events', () => {
      service.logTrackEvent('track-youtube', 'Coltrane', null, 'Naima', null).subscribe();

      const req = httpMock.expectOne('/api/session/events');
      expect(req.request.body.eventType).toBe('track-youtube');
      expect(req.request.body.album).toBeNull();
      expect(req.request.body.durationSeconds).toBeNull();
      req.flush(null, { status: 204, statusText: 'No Content' });
    });

    it('sends current ISO timestamp in the request body', () => {
      const before = new Date().toISOString();
      service.logTrackEvent('track-added', 'Artist', null, 'Title', null).subscribe();
      const after = new Date().toISOString();

      const req = httpMock.expectOne('/api/session/events');
      expect(req.request.body.timestamp >= before).toBe(true);
      expect(req.request.body.timestamp <= after).toBe(true);
      req.flush(null, { status: 204, statusText: 'No Content' });
    });

    it('sends null when durationSeconds is undefined', () => {
      service.logTrackEvent('track-added', 'Artist', null, 'Title', undefined).subscribe();

      const req = httpMock.expectOne('/api/session/events');
      expect(req.request.body.durationSeconds).toBeNull();
      req.flush(null, { status: 204, statusText: 'No Content' });
    });
  });

  describe('getMemoryStatus', () => {
    it('GETs /api/session/memory and returns used/total', () => {
      const mockStatus: MemoryStatus = { used: 7, total: 25 };
      let result: MemoryStatus | undefined;

      service.getMemoryStatus().subscribe(s => (result = s));

      const req = httpMock.expectOne('/api/session/memory');
      expect(req.request.method).toBe('GET');
      req.flush(mockStatus);

      expect(result?.used).toBe(7);
      expect(result?.total).toBe(25);
    });
  });

  describe('bustMemory', () => {
    it('DELETEs /api/session/memory', () => {
      service.bustMemory().subscribe();

      const req = httpMock.expectOne('/api/session/memory');
      expect(req.request.method).toBe('DELETE');
      req.flush(null, { status: 204, statusText: 'No Content' });
    });
  });
});
