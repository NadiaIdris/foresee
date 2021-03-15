export const convertKelvinToFahrenheit = (tempInK: number) => {
  return (tempInK - 273.15) * 1.8 + 32;
};

export const convertKelvinToCelsius = (tempInK: number) => {
  return tempInK - 273.15;
};

/**
 * @param unixTime - current time or time of the forecasted data in Unix, UTC format
 */
export const formatDate = (unixTime: number, offset: number): string => {
  const date = new Date(unixTime * 1000);
  let dayIndex = date.getUTCDay(); // returns 0 - 6. Sunday - Saturday : 0 - 6.
  let dayOfMonth = date.getUTCDate(); // returns 1 - 31.
  let monthIndex = date.getUTCMonth(); // returns 0 - 11.
  const year = date.getUTCFullYear();

  // Check if hours > 24, then increment day by 1. If hours < 0, then
  // decrement day by 1.
  let hours = calcHours(unixTime, offset);
  if (hours < 0) {
    dayIndex = dayIndex - 1;
    dayOfMonth = dayOfMonth - 1;
  } else if (hours >= 24) {
    dayIndex = dayIndex + 1;
    if (dayIndex > 6) {
      dayIndex = dayIndex - 7;
    }
    dayOfMonth = dayOfMonth + 1;
    if (dayOfMonth > daysInMonth(monthIndex + 1, year)) {
      dayOfMonth = 1;
      monthIndex = monthIndex + 1;
    }
  }

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = dayNames[dayIndex];

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[monthIndex];
  return `${day}, ${month} ${dayOfMonth}`;
};

const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

function calcHours(unixTime: number, offset: number) {
  const date: Date = new Date(unixTime * 1000);
  let UTCHours: number = date.getUTCHours();
  let UTCMinutes: number = date.getUTCMinutes();
  let offsetMinutes: number = 0;
  let hours: number = 0;

  // If number is not an integer, get the floating nums, convert them to
  // mins and add then to the UTCMinutes. Then add minutes to UTC hours and
  // offset hours and that is the correct hour to show weather for.
  if (!Number.isInteger(offset)) {
    if (offset % 1 === 0.5) {
      offsetMinutes = 30;
    } else if (offset % 1 === 0.75) {
      offsetMinutes = 45;
    } else if (offset % 1 === 0.25) {
      offsetMinutes = 15;
    }

    UTCMinutes += offsetMinutes;

    if (UTCMinutes >= 60) {
      UTCHours++;
    }

    hours = UTCHours + offset;
  } else {
    hours = UTCHours + offset;
  }
  return hours;
}
