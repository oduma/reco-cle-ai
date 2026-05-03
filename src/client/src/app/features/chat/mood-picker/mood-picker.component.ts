import { Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Mood, MOODS } from '../../../core/models/mood';

@Component({
  selector: 'app-mood-picker',
  standalone: true,
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './mood-picker.component.html',
  styleUrl: './mood-picker.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MoodPickerComponent {
  currentMood = input<Mood>('normal');
  moodSelected = output<Mood>();

  protected readonly moods = MOODS;

  protected moodLabel = computed(() => {
    const m = this.currentMood();
    return m ? m.charAt(0).toUpperCase() + m.slice(1) : 'Normal';
  });

  protected select(mood: Mood): void {
    this.moodSelected.emit(mood);
  }
}
