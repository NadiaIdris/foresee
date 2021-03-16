import { convertKelvinToCelsius, convertKelvinToFahrenheit } from "./utils";

/**
 * This is the main model that holds all the weather report data for a given location.
 * 1. This is meant to be saved to the state of the top level React component.
 * 2. This is meant to be constructed when a fetch call to OpenWeather one-call-api endpoint resolves.
 *
 * Docs on one-call-api endpoint: https://openweathermap.org/api/one-call-api
 */
export class WeatherReport {
  constructor(
    readonly currentConditions: Conditions,
    readonly dayOverviews: Array<DailyOverview>,
    readonly timezoneOffset: number,
  ) {}
}

export class Conditions {
  readonly temperatureInKelvin: number;
  readonly temperatureInFahrenheit: number;
  readonly temperatureInCelsius: number;
  readonly icon: string;
  readonly formattedDate: string;

  constructor(temperatureInKelvin: number, icon: string, formattedDate: string) {
    this.temperatureInKelvin = temperatureInKelvin;
    this.temperatureInFahrenheit = convertKelvinToFahrenheit(this.temperatureInKelvin);
    this.temperatureInCelsius = convertKelvinToCelsius(this.temperatureInKelvin);
    this.icon = icon;
    this.formattedDate = formattedDate;
  }
}

export class DailyOverview {
  readonly dailyConditions: Conditions;
  readonly time: number;
  readonly offset: number;

  constructor(temperatureInKelvin: number, icon: string, time: number, offset: number, isTomorrow: boolean = false) {
    this.time = time;
    this.offset = offset;
    this.dailyConditions = new Conditions(temperatureInKelvin, icon, isTomorrow ? "Tomorrow" : this.formatDate());
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

    // Check if hours > 24, then increment day by 1. If hours < 0, then
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

/**
 * Try not to use anonymous object literals when possible
 * http://3dmdesign.com/development/javascript-variables-and-anonymous-objects
 *
 * const cc2: CurrentConditions = {
 *   temperatureInKelvin: 0,
 *   temperatureInCelsius: 0,
 *   temperatureInFahrenheit: 0,
 *   icon: "",
 *   formattedDate: "",
 * };
 */
export const cleanupWeatherDataFromAPI = (data: any): WeatherReport => {
  const timezoneOffset: number = data.timezone_offset;

  const currentConditions: Conditions = new Conditions(data.current.temp, data.current.weather["0"].icon, "Now");

  const dailyArray = data.daily;
  const dailyOverviews: Array<DailyOverview> = [];
  for (let index = 1; index < dailyArray.length; index++) {
    const daily = dailyArray[index];
    const dailyOverview = new DailyOverview(
      daily.temp.day,
      daily.weather[0].icon,
      daily.dt,
      timezoneOffset,
      index == 1,
    );
    dailyOverviews.push(dailyOverview);
  }

  return new WeatherReport(currentConditions, dailyOverviews, timezoneOffset);
};

export const fetchWeatherDataFromAPI = async (setStateFunction: (newState: WeatherReport) => void) => {
  // TODO: make the fetch call to the OWM onecall API, and pass the API_KEY
  // TODO: then get a response and pass it to cleanupWeatherDataFromAPI() which returns a new WeatherReport
  // TODO: call the setStateFunction() with the WeatherReport
};

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
