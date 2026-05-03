export type Mood = 'normal' | 'poetic' | 'humorous' | 'cosmic' | 'minimalist'
                 | 'romantic' | 'chaotic' | 'noir' | 'psychedelic';

export const MOODS: { value: Mood; label: string }[] = [
  { value: 'normal',      label: 'Normal'      },
  { value: 'poetic',      label: 'Poetic'      },
  { value: 'humorous',    label: 'Humorous'    },
  { value: 'cosmic',      label: 'Cosmic'      },
  { value: 'minimalist',  label: 'Minimalist'  },
  { value: 'romantic',    label: 'Romantic'    },
  { value: 'chaotic',     label: 'Chaotic'     },
  { value: 'noir',        label: 'Noir'        },
  { value: 'psychedelic', label: 'Psychedelic' },
];
