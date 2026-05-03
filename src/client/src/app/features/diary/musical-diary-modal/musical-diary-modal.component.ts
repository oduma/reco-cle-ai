import {
  Component, OnInit, signal, computed, inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DiaryService } from '../../../core/services/diary.service';

function toDateKey(d: Date): string {
  const y  = d.getFullYear();
  const m  = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

@Component({
  selector: 'app-musical-diary-modal',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDatepickerModule,
  ],
  templateUrl: './musical-diary-modal.component.html',
  styleUrl:    './musical-diary-modal.component.scss',
})
export class MusicalDiaryModalComponent implements OnInit {
  private readonly diaryService = inject(DiaryService);
  private readonly dialogRef    = inject(MatDialogRef<MusicalDiaryModalComponent>);

  protected readonly activeDates  = signal<Set<string>>(new Set());
  protected readonly selectedDate = signal<Date | null>(null);
  protected readonly entryContent = signal<string | null>(null);
  protected readonly entryLoading = signal(false);
  protected readonly entryError   = signal<string | null>(null);
  protected readonly isFromCache  = signal(false);
  protected readonly datesLoading = signal(true);

  protected readonly maxDate = computed(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  });

  protected readonly selectedDateLabel = computed(() => {
    const d = this.selectedDate();
    return d ? d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : null;
  });

  protected readonly dateClass: MatCalendarCellClassFunction<Date> = (date, view) => {
    if (view !== 'month') return '';
    return this.activeDates().has(toDateKey(date)) ? 'diary-active-day' : '';
  };

  ngOnInit(): void {
    this.diaryService.getActiveDates().subscribe({
      next: dates => {
        this.activeDates.set(new Set(dates));
        this.datesLoading.set(false);
      },
      error: () => this.datesLoading.set(false),
    });
  }

  protected onDateSelected(date: Date | null): void {
    if (!date) return;
    const key = toDateKey(date);
    if (!this.activeDates().has(key)) return;
    this.selectedDate.set(date);
    this.loadEntry(key, false);
  }

  protected regenerate(): void {
    const date = this.selectedDate();
    if (!date) return;
    this.loadEntry(toDateKey(date), true);
  }

  private loadEntry(date: string, force: boolean): void {
    this.entryLoading.set(true);
    this.entryError.set(null);
    this.entryContent.set(null);

    this.diaryService.getOrGenerateEntry(date, force).subscribe({
      next: res => {
        this.entryContent.set(res.content);
        this.isFromCache.set(res.isFromCache);
        this.entryLoading.set(false);
      },
      error: () => {
        this.entryError.set('Could not generate your diary entry. Please try again.');
        this.entryLoading.set(false);
      },
    });
  }

  protected close(): void {
    this.dialogRef.close();
  }
}
