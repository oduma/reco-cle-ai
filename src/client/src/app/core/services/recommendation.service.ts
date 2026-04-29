import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ConversationTurn {
  role: 'user' | 'model';
  text: string;
}

export interface TrackSuggestion {
  title: string;
  artist: string;
  album: string | null;
  inLocalLibrary: boolean;
  filePath?: string;
}

export interface RecommendationRequest {
  prompt: string;
  history: ConversationTurn[];
  provider: 'gemini' | 'local';
}

export interface RecommendationResponse {
  narrative: string;
  suggestions: TrackSuggestion[];
  history: ConversationTurn[];
  message: string | null;
  providerUsed: string;
  usedFallback: boolean;
}

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  constructor(private http: HttpClient) {}

  getRecommendations(
    prompt: string,
    history: ConversationTurn[],
    provider: 'gemini' | 'local' = 'gemini',
  ): Observable<RecommendationResponse> {
    return this.http.post<RecommendationResponse>('/api/recommendations', {
      prompt,
      history,
      provider,
    } satisfies RecommendationRequest);
  }
}
