import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  constructor(private http: HttpClient) {}

  addToPlaylist(filePaths: string[]): Observable<void> {
    return this.http.post<void>('/api/clementine/add', { filePaths });
  }
}
