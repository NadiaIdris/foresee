import { convertKelvinToCelsius, convertKelvinToFahrenheit, formatDate } from "./utils";

/**
 * This is the main model that holds all the weather report data for a given location.
 * 1. This is meant to be saved to the state of the top level React component.
 * 2. This is meant to be constructed when a fetch call to OpenWeather one-call-api endpoint resolves.
 *
 * Docs on one-call-api endpoint: https://openweathermap.org/api/one-call-api
 */
export class WeatherReport {
  readonly currentConditions: CurrentConditions;
  readonly dayOverviews: Array<DailyOverview>;
  readonly timezoneOffset: number;

  /** Create a WeatherReport object given the JSON data from the OpenWeather one-call-api endpoint. */
  constructor(data: any) {
    this.timezoneOffset = data.timezone_offset;
    this.currentConditions = new CurrentConditions(data.current);
    this.dayOverviews = this.cleanupDailyData(data.daily);
  }

  private cleanupDailyData(dailyArray: Array<any>): Array<DailyOverview> {
    const tempArray: Array<DailyOverview> = [];
    const length = dailyArray.length;
    for (let index = 1; index < length; index++) {
      const daily: any = dailyArray[index];
      // TS equality is not same as JS: https://stackoverflow.com/a/60669874
      const dailyOverview = new DailyOverview(daily, this.timezoneOffset, index == 1);
      tempArray.push(dailyOverview);
    }
    return tempArray;
  }
}

export class CurrentConditions {
  readonly temperatureInKelvin: number;
  readonly temperatureInFahrenheit: number;
  readonly temperatureInCelsius: number;
  readonly icon: string;
  readonly formattedDate: string;

  constructor(currentOrDaily: any, defaultFormattedDate: string = "Now") {
    this.temperatureInKelvin = currentOrDaily.temp;
    this.temperatureInFahrenheit = convertKelvinToFahrenheit(currentOrDaily.temp);
    this.temperatureInCelsius = convertKelvinToCelsius(currentOrDaily.temp);
    this.icon = currentOrDaily.weather.icon;
    this.formattedDate = defaultFormattedDate;
  }
}

export class DailyOverview extends CurrentConditions {
  readonly time: number;
  readonly offset: number;

  constructor(daily: any, offset: number, isTomorrow: boolean = false) {
    const unixTime = daily.dt;
    super(daily, isTomorrow ? "Tomorrow" : formatDate(unixTime, offset));
    this.time = unixTime;
    this.offset = offset;
  }
}

export const makeFetchCall = async () => {
  // TODO: make the fetch call to the actual API, and pass the API_KEY
  // TODO: then get a response and create a new WeatherReport object (and set the state of the parent React component)
};

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
