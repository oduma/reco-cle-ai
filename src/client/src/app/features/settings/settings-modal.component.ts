import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SettingsService } from '../../core/services/settings.service';

export interface SettingField {
  key: string;
  label: string;
  type: 'text' | 'password' | 'number';
  placeholder?: string;
}

export interface SettingsGroup {
  title: string;
  fields: SettingField[];
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
      { key: 'OLLAMA_BASE_URL',     label: 'Base URL',           type: 'text',   placeholder: 'http://localhost:11434' },
      { key: 'OLLAMA_WHISPER_MODEL', label: 'Inner Whisper model', type: 'text',  placeholder: 'llama3.1:8b' },
      { key: 'OLLAMA_SHOUT_MODEL',   label: 'Inner Shout model',   type: 'text',  placeholder: 'gemma4:e4b' },
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
      { key: 'CLEMENTINE_DB_PATH',         label: 'Database path',      type: 'text',   placeholder: 'Path to clementine.db copy' },
      { key: 'CLEMENTINE_EXE_PATH',        label: 'Executable path',    type: 'text',   placeholder: 'Path to clementine.exe' },
      { key: 'CLEMENTINE_MATCH_THRESHOLD', label: 'Match threshold',    type: 'number', placeholder: '0.75' },
    ],
  },
  {
    title: 'Recommendations',
    fields: [
      { key: 'RECOMMENDATION_MIN_TRACKS',                label: 'Min tracks',        type: 'number', placeholder: '10' },
      { key: 'RECOMMENDATION_MAX_TRACKS',                label: 'Max tracks',        type: 'number', placeholder: '20' },
      { key: 'RECOMMENDATION_SUGGESTION_CACHE_MINUTES',  label: 'Suggestion cache (min)', type: 'number', placeholder: '60' },
    ],
  },
  {
    title: 'Session memory',
    fields: [
      { key: 'SESSION_MEMORY_SIZE',                    label: 'Memory size (replies)',      type: 'number', placeholder: '25' },
      { key: 'SESSION_DEFAULT_TRACK_DURATION_SECONDS', label: 'Default track duration (s)', type: 'number', placeholder: '210' },
    ],
  },
];

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
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
  protected loading  = signal(true);
  protected saving   = signal(false);
  protected saveError = signal<string | null>(null);
  protected groups   = SETTINGS_GROUPS;

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

    this.settingsService.getSettings().subscribe({
      next: res => {
        for (const entry of res.settings) {
          if (this.form.contains(entry.key)) {
            this.form.get(entry.key)?.setValue(entry.value ?? '');
          }
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  protected isRevealed(key: string): boolean {
    return this.revealed()[key] ?? false;
  }

  protected toggleReveal(key: string): void {
    this.revealed.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  protected fieldType(field: SettingField): string {
    if (field.type === 'password') return this.isRevealed(field.key) ? 'text' : 'password';
    return field.type === 'number' ? 'text' : 'text';
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
