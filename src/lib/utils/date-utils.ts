import { setHours, setMinutes } from 'date-fns';

export function timeStringToDate(timeString: string | null): Date {
  if (!timeString) {
    // Default to 12:00 PM
    return setHours(setMinutes(new Date(), 0), 12);
  }

  try {
    // Parse time string in format "HH:mm:ss"
    const [hours, minutes] = timeString.split(':').map(Number);

    // Validate hours and minutes
    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      return setHours(setMinutes(new Date(), 0), 12); // Default to 12:00 PM if invalid
    }

    return setHours(setMinutes(new Date(), minutes), hours);
  } catch (error) {
    // Return default time if parsing fails
    return setHours(setMinutes(new Date(), 0), 12);
  }
}

export function dateToTimeString(date: Date | string | null): string {
  if (!date) return '12:00:00';

  try {
    const d = new Date(date);

    // Check if date is valid
    if (isNaN(d.getTime())) {
      return '12:00:00';
    }

    const hours = d.getHours();
    const minutes = d.getMinutes();

    // Ensure hours and minutes are valid
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return '12:00:00';
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  } catch (error) {
    return '12:00:00';
  }
}
