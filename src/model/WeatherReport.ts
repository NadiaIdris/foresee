import { Conditions } from "./Conditions";
import { DailyOverview } from "./DailyOverview";
import { CounterState } from "../my-types";
import { data } from "../tests/onecall_api_sample_response";

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

  static cleanupWeatherDataFromAPI = (data: any): WeatherReport => {
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

  static fetchWeatherDataFromOpenWeatherMap = async (callback: (newState: WeatherReport) => void) => {
    // TODO: make the fetch call to the OWM onecall API, and pass the API_KEY
    // TODO: then get a response and pass it to cleanupWeatherDataFromAPI() which returns a new WeatherReport
    // TODO: call the setStateFunction() with the WeatherReport
    console.log("🔥 fetchWeatherDataFromAPI called with callback", callback);
    const report = WeatherReport.cleanupWeatherDataFromAPI(data);
    console.log("🔥 report", report);
    callback(report);
    console.log("🔥 fetchWeatherDataFromAPI() just called setState() method on your component!");
  };
}

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
