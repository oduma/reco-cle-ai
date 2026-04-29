import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { RecommendationService, RecommendationResponse } from './recommendation.service';

const EMPTY_RESPONSE: RecommendationResponse = {
  narrative: '',
  suggestions: [],
  history: [],
  message: null,
  providerUsed: 'gemini',
  usedFallback: false,
};

describe('RecommendationService', () => {
  let service: RecommendationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), RecommendationService],
    });
    service = TestBed.inject(RecommendationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('POSTs to /api/recommendations with prompt and history', () => {
    const history = [{ role: 'user' as const, text: 'previous' }];
    service.getRecommendations('melancholic jazz', history).subscribe();

    const req = httpMock.expectOne('/api/recommendations');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.prompt).toBe('melancholic jazz');
    expect(req.request.body.history).toEqual(history);
    req.flush(EMPTY_RESPONSE);
  });

  it('returns narrative, suggestions and updated history from the API', () => {
    const mockResponse: RecommendationResponse = {
      narrative: 'Try Blue in Green by Miles Davis.',
      suggestions: [
        { title: 'Blue in Green', artist: 'Miles Davis', album: 'Kind of Blue', inLocalLibrary: false },
      ],
      history: [
        { role: 'user', text: 'jazz?' },
        { role: 'model', text: 'Try Blue in Green by Miles Davis.' },
      ],
      message: null,
      providerUsed: 'gemini',
      usedFallback: false,
    };

    let result: RecommendationResponse | undefined;
    service.getRecommendations('jazz?', []).subscribe(r => (result = r));
    httpMock.expectOne('/api/recommendations').flush(mockResponse);

    expect(result?.narrative).toContain('Blue in Green');
    expect(result?.suggestions.length).toBe(1);
    expect(result?.suggestions[0].album).toBe('Kind of Blue');
    expect(result?.history.length).toBe(2);
  });
});
