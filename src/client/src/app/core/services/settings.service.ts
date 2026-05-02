import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SettingsEntry {
  key: string;
  value: string | null;
}

export interface SettingsResponse {
  settings: SettingsEntry[];
}

export interface UpdateSettingsRequest {
  settings: Record<string, string | null>;
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(private http: HttpClient) {}

  getSettings(): Observable<SettingsResponse> {
    return this.http.get<SettingsResponse>('/api/settings');
  }

  updateSettings(payload: UpdateSettingsRequest): Observable<void> {
    return this.http.put<void>('/api/settings', payload);
  }
}
