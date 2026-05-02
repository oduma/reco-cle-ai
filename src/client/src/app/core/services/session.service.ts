import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MemoryStatus {
  used: number;
  total: number;
}

export interface SessionEventRequest {
  eventType: 'track-added' | 'track-youtube';
  artist: string;
  album: string | null;
  title: string;
  durationSeconds: number | null;
  timestamp: string; // ISO 8601
}

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(private http: HttpClient) {}

  logTrackEvent(
    eventType: 'track-added' | 'track-youtube',
    artist: string,
    album: string | null,
    title: string,
    durationSeconds: number | null | undefined,
  ): Observable<void> {
    const body: SessionEventRequest = {
      eventType,
      artist,
      album,
      title,
      durationSeconds: durationSeconds ?? null,
      timestamp: new Date().toISOString(),
    };
    return this.http.post<void>('/api/session/events', body);
  }

  getMemoryStatus(): Observable<MemoryStatus> {
    return this.http.get<MemoryStatus>('/api/session/memory');
  }

  bustMemory(): Observable<void> {
    return this.http.delete<void>('/api/session/memory');
  }
}
