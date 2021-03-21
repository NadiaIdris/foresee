import { Conditions } from "./Conditions";
import { DailyOverview } from "./DailyOverview";
import axios from "axios";
import { SaveWeatherReportToState } from "../my-types";

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

  static readonly API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

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

  static fetchWeatherDataFromOpenWeatherMap = async (
    saveWeatherReportToState: SaveWeatherReportToState,
    lat: number = 37.3875,
    lon: number = -122.0831,
  ) => {
    const exclude = "exclude=minutely,alerts";
    const apikey = `appid=${WeatherReport.API_KEY}`;
    const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&${exclude}&${apikey}`;
    axios.get(endpoint).then((res) => {
      const data: any = res.data;
      const weatherReport: WeatherReport = WeatherReport.cleanupWeatherDataFromAPI(data);
      saveWeatherReportToState(weatherReport);
    });
  };
}
