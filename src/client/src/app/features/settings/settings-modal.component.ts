import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { forkJoin } from 'rxjs';
import { SettingsService } from '../../core/services/settings.service';
import { Provider } from '../../core/services/recommendation.service';

export interface SettingField {
  key: string;
  label: string;
  type: 'text' | 'password' | 'number' | 'textarea';
  placeholder?: string;
}

export interface SettingsGroup {
  title: string;
  fields: SettingField[];
  hasResets?: boolean;
}

export const SETTINGS_GROUPS: SettingsGroup[] = [
  {
    title: 'Gemini (Cosmic Voice)',
    fields: [
      { key: 'GEMINI_API_KEY',  label: 'API Key',   type: 'password', placeholder: 'Gemini API key' },
      { key: 'GEMINI_MODEL',    label: 'Model',     type: 'text',     placeholder: 'e.g. gemini-2.5-pro' },
      { key: 'GEMINI_BASE_URL', label: 'Base URL',  type: 'text',     placeholder: 'https://generativelanguage.googleapis.com' },
    ],
  },
  {
    title: 'Ollama (Inner Voices)',
    fields: [
      { key: 'OLLAMA_BASE_URL',      label: 'Base URL',            type: 'text', placeholder: 'http://localhost:11434' },
      { key: 'OLLAMA_WHISPER_MODEL', label: 'Inner Whisper model', type: 'text', placeholder: 'llama3.1:8b' },
      { key: 'OLLAMA_SHOUT_MODEL',   label: 'Inner Shout model',   type: 'text', placeholder: 'gemma4:e4b' },
    ],
  },
  {
    title: 'Last.fm (Album art)',
    fields: [
      { key: 'LASTFM_API_KEY',  label: 'API Key',  type: 'password', placeholder: 'Last.fm read API key' },
      { key: 'LASTFM_BASE_URL', label: 'Base URL', type: 'text',     placeholder: 'https://ws.audioscrobbler.com/2.0/' },
    ],
  },
  {
    title: 'Clementine',
    fields: [
      { key: 'CLEMENTINE_DB_PATH',         label: 'Database path',   type: 'text',   placeholder: 'Path to clementine.db copy' },
      { key: 'CLEMENTINE_EXE_PATH',        label: 'Executable path', type: 'text',   placeholder: 'Path to clementine.exe' },
      { key: 'CLEMENTINE_MATCH_THRESHOLD', label: 'Match threshold', type: 'number', placeholder: '0.75' },
    ],
  },
  {
    title: 'Recommendations',
    fields: [
      { key: 'RECOMMENDATION_MIN_TRACKS',               label: 'Min tracks',              type: 'number', placeholder: '10' },
      { key: 'RECOMMENDATION_MAX_TRACKS',               label: 'Max tracks',              type: 'number', placeholder: '20' },
      { key: 'RECOMMENDATION_SUGGESTION_CACHE_MINUTES', label: 'Suggestion cache (min)',  type: 'number', placeholder: '60' },
      { key: 'RECOMMENDATION_HISTORY_MAX_ROWS',         label: 'History cap (rows)',      type: 'number', placeholder: '10000' },
    ],
  },
  {
    title: 'Session memory',
    fields: [
      { key: 'SESSION_MEMORY_SIZE',                    label: 'Memory size (replies)',      type: 'number', placeholder: '25' },
      { key: 'SESSION_DEFAULT_TRACK_DURATION_SECONDS', label: 'Default track duration (s)', type: 'number', placeholder: '210' },
    ],
  },
  {
    title: 'AI Settings',
    hasResets: true,
    fields: [
      { key: 'SESSION_MEMORY_INSTRUCTION',         label: 'Session memory instruction',      type: 'textarea' },
      { key: 'RECOMMENDATION_INSTRUCTION', label: 'Recommendation prompt', type: 'textarea' },
      { key: 'DIARY_SYSTEM_INSTRUCTION',           label: 'Diary system instruction',        type: 'textarea' },
      { key: 'MOOD_ANNOTATION_POETIC',      label: 'Mood annotation: Poetic',      type: 'text' },
      { key: 'MOOD_ANNOTATION_HUMOROUS',    label: 'Mood annotation: Humorous',    type: 'text' },
      { key: 'MOOD_ANNOTATION_COSMIC',      label: 'Mood annotation: Cosmic',      type: 'text' },
      { key: 'MOOD_ANNOTATION_MINIMALIST',  label: 'Mood annotation: Minimalist',  type: 'text' },
      { key: 'MOOD_ANNOTATION_ROMANTIC',    label: 'Mood annotation: Romantic',    type: 'text' },
      { key: 'MOOD_ANNOTATION_CHAOTIC',     label: 'Mood annotation: Chaotic',     type: 'text' },
      { key: 'MOOD_ANNOTATION_NOIR',        label: 'Mood annotation: Noir',        type: 'text' },
      { key: 'MOOD_ANNOTATION_PSYCHEDELIC', label: 'Mood annotation: Psychedelic', type: 'text' },
    ],
  },
];

const PROVIDER_KEY = 'reco-provider';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './settings-modal.component.html',
  styleUrl:    './settings-modal.component.scss',
})
export class SettingsModalComponent implements OnInit {
  protected form!: FormGroup;
  protected loading   = signal(true);
  protected saving    = signal(false);
  protected saveError = signal<string | null>(null);
  protected groups    = SETTINGS_GROUPS;
  protected defaults  = signal<Record<string, string>>({});

  // Provider toggle (localStorage-backed, takes effect immediately)
  protected provider = signal<Provider>(
    (localStorage.getItem(PROVIDER_KEY) as Provider) ?? 'gemini',
  );

  // Environmental context checkboxes (DB-persisted, saved with the form)
  protected useLocation = signal(false);
  protected useWeather  = signal(false);

  // Tracks which password fields are revealed
  protected revealed = signal<Record<string, boolean>>({});

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private dialogRef: MatDialogRef<SettingsModalComponent>,
  ) {}

  ngOnInit(): void {
    const controls: Record<string, string> = {};
    for (const group of SETTINGS_GROUPS) {
      for (const field of group.fields) {
        controls[field.key] = '';
      }
    }
    this.form = this.fb.group(controls);

    forkJoin({
      settings: this.settingsService.getSettings(),
      defaults: this.settingsService.getDefaults(),
    }).subscribe({
      next: ({ settings, defaults }) => {
        this.defaults.set(defaults);
        for (const entry of settings.settings) {
          if (this.form.contains(entry.key)) {
            this.form.get(entry.key)?.setValue(entry.value ?? '');
          }
          if (entry.key === 'USE_USER_LOCATION')  this.useLocation.set(entry.value === 'true');
          if (entry.key === 'USE_CURRENT_WEATHER') this.useWeather.set(entry.value === 'true');
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  protected selectProvider(p: Provider): void {
    this.provider.set(p);
    localStorage.setItem(PROVIDER_KEY, p);
  }

  // Returns the currently configured model label for provider buttons
  protected modelLabel(key: string, fallback: string): string {
    const v = (this.form.get(key)?.value as string)?.trim();
    return v || fallback;
  }

  protected isRevealed(key: string): boolean {
    return this.revealed()[key] ?? false;
  }

  protected toggleReveal(key: string): void {
    this.revealed.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  protected fieldType(field: SettingField): string {
    if (field.type === 'password') return this.isRevealed(field.key) ? 'text' : 'password';
    return 'text';
  }

  protected resetField(key: string): void {
    const def = this.defaults()[key];
    if (def !== undefined) {
      this.form.get(key)?.setValue(def);
    }
  }

  protected save(): void {
    if (this.saving()) return;
    this.saving.set(true);
    this.saveError.set(null);

    const payload: Record<string, string | null> = {};
    const raw = this.form.value as Record<string, string>;
    for (const key of Object.keys(raw)) {
      payload[key] = raw[key].trim() === '' ? null : raw[key].trim();
    }

    // Environmental context toggles — always stored as explicit "true"/"false"
    payload['USE_USER_LOCATION']  = this.useLocation()  ? 'true' : 'false';
    payload['USE_CURRENT_WEATHER'] = this.useWeather() ? 'true' : 'false';

    this.settingsService.updateSettings({ settings: payload }).subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogRef.close(true);
      },
      error: () => {
        this.saving.set(false);
        this.saveError.set('Could not save settings. Please try again.');
      },
    });
  }

  protected cancel(): void {
    this.dialogRef.close(false);
  }
}
