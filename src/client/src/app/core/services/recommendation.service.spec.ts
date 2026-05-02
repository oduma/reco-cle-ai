import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { RecommendationService, RecommendationResponse } from './recommendation.service';

const EMPTY_RESPONSE: RecommendationResponse = {
  narrative: '',
  suggestions: [],
  message: null,
  providerUsed: 'gemini',
  usedFallback: false,
  aiReplyEventId: 0,
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

  it('POSTs to /api/recommendations with prompt', () => {
    service.getRecommendations('melancholic jazz').subscribe();

    const req = httpMock.expectOne('/api/recommendations');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.prompt).toBe('melancholic jazz');
    req.flush(EMPTY_RESPONSE);
  });

  it('sends inner-whisper provider value when specified', () => {
    service.getRecommendations('jazz', 'inner-whisper').subscribe();
    const req = httpMock.expectOne('/api/recommendations');
    expect(req.request.body.provider).toBe('inner-whisper');
    req.flush(EMPTY_RESPONSE);
  });

  it('sends inner-shout provider value when specified', () => {
    service.getRecommendations('jazz', 'inner-shout').subscribe();
    const req = httpMock.expectOne('/api/recommendations');
    expect(req.request.body.provider).toBe('inner-shout');
    req.flush(EMPTY_RESPONSE);
  });

  it('returns narrative and suggestions from the API', () => {
    const mockResponse: RecommendationResponse = {
      narrative: 'Try Blue in Green by Miles Davis.',
      suggestions: [
        { title: 'Blue in Green', artist: 'Miles Davis', album: 'Kind of Blue', inLocalLibrary: false },
      ],
      message: null,
      providerUsed: 'gemini',
      usedFallback: false,
      aiReplyEventId: 5,
    };

    let result: RecommendationResponse | undefined;
    service.getRecommendations('jazz?').subscribe(r => (result = r));
    httpMock.expectOne('/api/recommendations').flush(mockResponse);

    expect(result?.narrative).toContain('Blue in Green');
    expect(result?.suggestions.length).toBe(1);
    expect(result?.suggestions[0].album).toBe('Kind of Blue');
  });
});
