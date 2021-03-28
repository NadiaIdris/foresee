import { Conditions } from "./Conditions";
import { DailyOverview } from "./DailyOverview";

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
    // TODO: readonly hourOverviews: Array<HourlyInfo>,
    readonly timezoneOffset: number,
  ) {}

  static readonly API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  // static methods can be written outside of this class. Adding it here because it's related to WeatherReport class.
  // static methods are not methods of an instances, but a method of the whole class.
  static cleanupWeatherDataFromApi = (data: any): WeatherReport => {
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
        index === 1,
      );
      dailyOverviews.push(dailyOverview);
    }

    return new WeatherReport(currentConditions, dailyOverviews, timezoneOffset);
  };
}
