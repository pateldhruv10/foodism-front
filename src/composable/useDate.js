import { DateTime } from 'luxon'

// by convention, composable function names start with "use"
export default function useDate() {
  const getDiffInHour = (date1, date2 = DateTime.now()) => {
    date1 = DateTime.fromISO(date1)

    return date1.diff(date2, ['hours']).hours;
  }

  return {
    getDiffInHour
  }
}
