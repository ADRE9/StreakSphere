type TCheckIn = Record<
  string,
  {
    id: string;
    checked_at: string | null;
    created_at: string | null;
    deleted: boolean | null;
    frequency: number | null;
    habit_id: string | null;
    updated_at: string | null;
  }
>;

export const getTodaysCheckInId = (habitId: string, checkIns: TCheckIn) => {
  const today = new Date();
  if (!checkIns) return null;
  const todaysCheckInId = Object.keys(checkIns).find((checkIn) => {
    const checkInDate = checkIns[checkIn].checked_at;
    if (!checkInDate) return false;
    const date = new Date(checkInDate);
    return (
      date.toDateString() === today.toDateString() &&
      checkIns[checkIn].habit_id === habitId
    );
  });

  return todaysCheckInId;
};
