import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DiaryEntryRequest {
  date: string;
  force: boolean;
}

export interface DiaryEntryResponse {
  content: string;
  isFromCache: boolean;
  generatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class DiaryService {
  private readonly http = inject(HttpClient);

  getActiveDates(): Observable<string[]> {
    return this.http.get<string[]>('/api/diary/active-dates');
  }

  getOrGenerateEntry(date: string, force = false): Observable<DiaryEntryResponse> {
    return this.http.post<DiaryEntryResponse>('/api/diary/entry', { date, force } satisfies DiaryEntryRequest);
  }
}
