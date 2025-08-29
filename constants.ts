
import type { AspectRatio } from './types';

export const ASPECT_RATIO_OPTIONS: { label: string; value: AspectRatio }[] = [
  { label: 'Desktop (16:9)', value: '16:9' },
  { label: 'Mobile (9:16)', value: '9:16' },
  { label: 'Square (1:1)', value: '1:1' },
  { label: 'Tablet (4:3)', value: '4:3' },
  { label: 'Portrait (3:4)', value: '3:4' },
];
