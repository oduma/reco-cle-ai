import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PlaylistService } from './playlist.service';

describe('PlaylistService', () => {
  let service: PlaylistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), PlaylistService],
    });
    service = TestBed.inject(PlaylistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('POSTs to /api/clementine/add with filePaths', () => {
    const paths = ['/music/track.flac'];
    service.addToPlaylist(paths).subscribe();

    const req = httpMock.expectOne('/api/clementine/add');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.filePaths).toEqual(paths);
    req.flush(null);
  });

  it('sends all provided file paths in a single request', () => {
    const paths = ['/music/a.flac', '/music/b.flac', '/music/c.flac'];
    service.addToPlaylist(paths).subscribe();

    const req = httpMock.expectOne('/api/clementine/add');
    expect(req.request.body.filePaths.length).toBe(3);
    req.flush(null);
  });
});
