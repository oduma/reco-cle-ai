import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ChatService, ChatResponse } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ChatService],
    });
    service = TestBed.inject(ChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('POSTs to /api/chat with prompt and history', () => {
    const history = [{ role: 'user' as const, text: 'previous' }];
    service.sendMessage('new prompt', history).subscribe();

    const req = httpMock.expectOne('/api/chat');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.prompt).toBe('new prompt');
    expect(req.request.body.history).toEqual(history);
    req.flush({ response: 'ok', history: [] } satisfies ChatResponse);
  });

  it('returns the ChatResponse from the API', () => {
    const mockResponse: ChatResponse = {
      response: 'Try Coltrane.',
      history: [
        { role: 'user', text: 'jazz?' },
        { role: 'model', text: 'Try Coltrane.' },
      ],
    };

    let result: ChatResponse | undefined;
    service.sendMessage('jazz?', []).subscribe(r => (result = r));

    httpMock.expectOne('/api/chat').flush(mockResponse);

    expect(result).toEqual(mockResponse);
  });
});
