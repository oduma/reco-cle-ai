import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TrackSuggestion {
  title: string;
  artist: string;
  album: string | null;
  inLocalLibrary: boolean;
  filePath?: string;
  albumArtUrl?: string | null;
  durationSeconds?: number | null;
}

export type Provider = 'gemini' | 'inner-whisper' | 'inner-shout';

export interface RecommendationRequest {
  prompt: string;
  provider: Provider;
}

export interface RecommendationResponse {
  narrative: string;
  suggestions: TrackSuggestion[];
  message: string | null;
  providerUsed: string;
  usedFallback: boolean;
}

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  constructor(private http: HttpClient) {}

  getRecommendations(
    prompt: string,
    provider: Provider = 'gemini',
  ): Observable<RecommendationResponse> {
    return this.http.post<RecommendationResponse>('/api/recommendations', {
      prompt,
      provider,
    } satisfies RecommendationRequest);
  }
}
