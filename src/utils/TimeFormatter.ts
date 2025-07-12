// utils/timeFormatter.ts
export function formatDuration(minutes: number): string {
  if (!minutes || minutes < 0) return '0 minutes';

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const parts = [];
  if (hrs > 0) parts.push(`${hrs} hour${hrs > 1 ? 's' : ''}`);
  if (mins > 0 || hrs === 0) parts.push(`${mins} minute${mins > 1 ? 's' : ''}`);

  return parts.join(' and ');
}
