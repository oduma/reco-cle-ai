import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ConversationTurn {
  role: 'user' | 'model';
  text: string;
}

export interface ChatRequest {
  prompt: string;
  history: ConversationTurn[];
}

export interface ChatResponse {
  response: string;
  history: ConversationTurn[];
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http: HttpClient) {}

  sendMessage(prompt: string, history: ConversationTurn[]): Observable<ChatResponse> {
    return this.http.post<ChatResponse>('/api/chat', { prompt, history } satisfies ChatRequest);
  }
}
