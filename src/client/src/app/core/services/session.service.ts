import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrackSuggestion } from './recommendation.service';

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

export interface HistoryTurn {
  role: 'user' | 'model';
  text: string;
  timestamp: string; // ISO 8601 from server
  eventId: number;
  hasSuggestions: boolean;
}

export interface SessionHistoryResponse {
  turns: HistoryTurn[];
  activeReplyId: number | null;
}

export interface EnrichedSuggestionsResponse {
  suggestions: TrackSuggestion[];
  message: string | null;
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

  getHistory(): Observable<SessionHistoryResponse> {
    return this.http.get<SessionHistoryResponse>('/api/session/history');
  }

  getEnrichedSuggestions(replyId: number): Observable<EnrichedSuggestionsResponse> {
    return this.http.get<EnrichedSuggestionsResponse>(`/api/session/reply/${replyId}/suggestions`);
  }

  setActiveReply(replyId: number): Observable<void> {
    return this.http.post<void>('/api/session/active-reply', { replyId });
  }
}
