import { setHours, setMinutes } from 'date-fns';

export function timeStringToDate(timeString: string | null): Date {
  if (!timeString) {
    // Default to 12:00 PM
    return setHours(setMinutes(new Date(), 0), 12);
  }

  // Parse time string in format "HH:mm:ss"
  const [hours, minutes] = timeString.split(':').map(Number);
  return setHours(setMinutes(new Date(), minutes || 0), hours || 12);
}

export function dateToTimeString(date: Date | string | null): string {
  if (!date) return '12:00:00';
  const d = new Date(date);
  return `${d.getHours().toString().padStart(2, '0')}:${d
    .getMinutes()
    .toString()
    .padStart(2, '0')}:00`;
}
