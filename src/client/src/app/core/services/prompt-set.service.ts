import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PromptSet } from '../models/prompt-set.model';

export interface CreatePromptSetRequest {
  name: string;
  useSession: boolean;
  recommendationPrompt: string;
}

export interface UpdatePromptSetRequest {
  name: string;
  useSession: boolean;
  recommendationPrompt: string;
}

@Injectable({ providedIn: 'root' })
export class PromptSetService {
  private readonly _promptSets = signal<PromptSet[]>([]);
  private readonly _activePromptSet = signal<PromptSet | null>(null);

  readonly promptSets = this._promptSets.asReadonly();
  readonly activePromptSet = this._activePromptSet.asReadonly();

  constructor(private http: HttpClient) {}

  loadAll(): Observable<PromptSet[]> {
    return this.http.get<PromptSet[]>('/api/prompt-sets').pipe(
      tap(sets => this._promptSets.set(sets)),
    );
  }

  getActiveName(): Observable<{ name: string }> {
    return this.http.get<{ name: string }>('/api/prompt-sets/active');
  }

  setActive(name: string): Observable<void> {
    return this.http.put<void>('/api/prompt-sets/active', { name }).pipe(
      tap(() => {
        const found = this._promptSets().find(ps => ps.name === name) ?? null;
        this._activePromptSet.set(found);
      }),
    );
  }

  create(req: CreatePromptSetRequest): Observable<PromptSet> {
    return this.http.post<PromptSet>('/api/prompt-sets', req).pipe(
      tap(created => this._promptSets.update(sets => [...sets, created].sort((a, b) => a.name.localeCompare(b.name)))),
    );
  }

  update(id: number, req: UpdatePromptSetRequest): Observable<PromptSet> {
    return this.http.put<PromptSet>(`/api/prompt-sets/${id}`, req).pipe(
      tap(updated => {
        this._promptSets.update(sets => sets.map(ps => ps.id === id ? updated : ps));
        if (this._activePromptSet()?.id === id) {
          this._activePromptSet.set(updated);
        }
      }),
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/prompt-sets/${id}`).pipe(
      tap(() => this._promptSets.update(sets => sets.filter(ps => ps.id !== id))),
    );
  }

  /** Initialise the service: load all sets and resolve the active one. */
  async init(): Promise<void> {
    const [sets, activeResp] = await Promise.all([
      this.http.get<PromptSet[]>('/api/prompt-sets').toPromise(),
      this.http.get<{ name: string }>('/api/prompt-sets/active').toPromise(),
    ]);
    const safeSets = sets ?? [];
    this._promptSets.set(safeSets);
    const active = safeSets.find(ps => ps.name === activeResp?.name) ?? safeSets[0] ?? null;
    this._activePromptSet.set(active);
  }
}
