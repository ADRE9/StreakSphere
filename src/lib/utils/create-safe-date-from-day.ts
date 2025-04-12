import { getMonth, getYear, isValid, set } from 'date-fns';

/**
 * Creates a date using the current month and year, with a given day.
 * Validates the date to ensure the day exists in that month.
 *
 * @param day - Day of the month (1–31)
 * @returns Valid Date object
 * @throws Error if the date is invalid for the current month/year
 */
export function createSafeDateFromDay(day: number): Date {
  const now = new Date();
  const year = getYear(now);
  const month = getMonth(now); // 0-based

  const date = set(new Date(), {
    year,
    month,
    date: day,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  if (!isValid(date) || getMonth(date) !== month) {
    throw new Error(`Invalid day "${day}" for ${month + 1}/${year}`);
  }

  return date;
}
