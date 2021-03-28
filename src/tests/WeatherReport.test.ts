import { WeatherReport } from "../model/WeatherReport";
import { data } from "./onecall_api_sample_response";

/**
 * Unit test naming convention [GivenWhenThen](https://martinfowler.com/bliki/GivenWhenThen.html) from the principles of
 * [BDD or Behavior-driven development](https://en.wikipedia.org/wiki/Behavior-driven_development).
 */

test("Given onecall_api_sample_response data.ts, lat property exists", () => {
  expect(data.lat).toBe(37.3875);
});

test("Given Onecall API url, when fetching the data, it return a JSON blob with the weather data in it", () => {});

test("Given a setState function , when fetchWeatherDataFromAPI is called, it calls setState with a WeatherReport", () => {
  //WeatherReport.fetchWeatherDataFromAPI(/*...*/);
});

test("Given onecall_api_sample_response.ts JSON data, when cleanupWeatherDataFromAPI is called, it returns WeatherReport", () => {
  const report = WeatherReport.cleanupWeatherDataFromApi(data);

  console.log(JSON.stringify(report, null, 2));

  expect(report).toBeDefined();
  expect(report).not.toBeNull();

  const numberOfDaysInWeeklyForecastWithoutCurrentConditions = report.dayOverviews.length;
  expect(numberOfDaysInWeeklyForecastWithoutCurrentConditions).toBe(7);

  const currentConditionsDate = report.currentConditions.formattedDate;
  expect(currentConditionsDate).toBe("Now");

  const tomorrowOverview = report.dayOverviews[0];
  expect(tomorrowOverview.dailyConditions.formattedDate).toBe("Tomorrow");

  const dayAfterTomorrowOverview = report.dayOverviews[1];
  expect(dayAfterTomorrowOverview.dailyConditions.formattedDate).not.toBe("Tomorrow");
});
