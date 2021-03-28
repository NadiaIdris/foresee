import { Conditions } from "./Conditions";

export class DailyOverview {
  readonly dailyConditions: Conditions;
  readonly time: number;
  readonly offset: number;

  constructor(tempInKelvin: number, icon: string, time: number, offset: number, isTomorrow: boolean = false) {
    this.time = time;
    this.offset = offset;
    this.dailyConditions = new Conditions(tempInKelvin, icon, isTomorrow ? "Tomorrow" : this.formatDate());
  }

  /**
   * @param unixTime - current time or time of the forecasted data in Unix, UTC format
   */
  formatDate = (): string => {
    const date = new Date(this.time * 1000);
    let dayIndex = date.getUTCDay(); // returns 0 - 6. Sunday - Saturday : 0 - 6.
    let dayOfMonth = date.getUTCDate(); // returns 1 - 31.
    let monthIndex = date.getUTCMonth(); // returns 0 - 11.
    const year = date.getUTCFullYear();

    // Check if hours >= 24, then increment day by 1. If hours < 0, then
    // decrement day by 1.
    let hours = this.calcHours();
    if (hours < 0) {
      dayIndex = dayIndex - 1;
      dayOfMonth = dayOfMonth - 1;
    } else if (hours >= 24) {
      dayIndex = dayIndex + 1;
      if (dayIndex > 6) {
        dayIndex = dayIndex - 7;
      }
      dayOfMonth = dayOfMonth + 1;
      if (dayOfMonth > this.daysInMonth(monthIndex + 1, year)) {
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

  private daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  private calcHours = () => {
    const date: Date = new Date(this.time * 1000);
    let UTCHours: number = date.getUTCHours();
    let UTCMinutes: number = date.getUTCMinutes();
    let offsetMinutes: number = 0;
    let hours: number = 0;

    // If number is not an integer, get the floating nums, convert them to
    // mins and add then to the UTCMinutes. Then add minutes to UTC hours and
    // offset hours and that is the correct hour to show weather for.
    if (!Number.isInteger(this.offset)) {
      if (this.offset % 1 === 0.5) {
        offsetMinutes = 30;
      } else if (this.offset % 1 === 0.75) {
        offsetMinutes = 45;
      } else if (this.offset % 1 === 0.25) {
        offsetMinutes = 15;
      }

      UTCMinutes += offsetMinutes;

      if (UTCMinutes >= 60) {
        UTCHours++;
      }

      hours = UTCHours + this.offset;
    } else {
      hours = UTCHours + this.offset;
    }
    return hours;
  };
}
