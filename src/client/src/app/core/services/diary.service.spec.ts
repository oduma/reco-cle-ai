import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { DiaryService, DiaryEntryResponse } from './diary.service';

describe('DiaryService', () => {
  let service: DiaryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), DiaryService],
    });
    service  = TestBed.inject(DiaryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  describe('getActiveDates', () => {
    it('GETs /api/diary/active-dates and returns date strings', async () => {
      const dates = ['2025-04-01', '2025-04-15'];
      let result: string[] | undefined;

      service.getActiveDates().subscribe(d => (result = d));

      const req = httpMock.expectOne('/api/diary/active-dates');
      expect(req.request.method).toBe('GET');
      req.flush(dates);

      expect(result).toEqual(dates);
    });
  });

  describe('getOrGenerateEntry', () => {
    const mockEntry: DiaryEntryResponse = {
      content: 'Today I sought the sound of rain-soaked streets.',
      isFromCache: false,
      generatedAt: '2025-04-01T10:00:00Z',
    };

    it('POSTs to /api/diary/entry with date and force=false by default', async () => {
      let result: DiaryEntryResponse | undefined;
      service.getOrGenerateEntry('2025-04-01').subscribe(r => (result = r));

      const req = httpMock.expectOne('/api/diary/entry');
      expect(req.request.method).toBe('POST');
      expect(req.request.body.date).toBe('2025-04-01');
      expect(req.request.body.force).toBe(false);
      req.flush(mockEntry);

      expect(result?.content).toBe(mockEntry.content);
    });

    it('POSTs with force=true when specified', async () => {
      service.getOrGenerateEntry('2025-04-01', true).subscribe();

      const req = httpMock.expectOne('/api/diary/entry');
      expect(req.request.body.force).toBe(true);
      req.flush(mockEntry);
    });

    it('maps isFromCache correctly for cached response', async () => {
      const cached: DiaryEntryResponse = { ...mockEntry, isFromCache: true };
      let result: DiaryEntryResponse | undefined;
      service.getOrGenerateEntry('2025-04-01').subscribe(r => (result = r));

      const req = httpMock.expectOne('/api/diary/entry');
      req.flush(cached);

      expect(result?.isFromCache).toBe(true);
    });
  });
});
