import { kelvinToCelsius, kelvinToFahrenheit, metresPerSecToKmPerHour, metresPerSecToMilesPerHour } from "./utils";

export class Hourly {
  readonly icon: string;
  readonly time: number;
  readonly tempInFahrenheit: number;
  readonly tempInCelsius: number;
  // wind_speed default unit is metre/sec (metric). Save current unit to localStorage.
  // If unit is F, then showcase imperial (miles/h). If unit is C, then showcase metric (km/h).
  readonly windMilesPerHour: number;
  readonly windKmPerHour: number;
  readonly uvIndex: number;
  readonly humidity: number;
  readonly precipitation: number;

  constructor(
    icon: string,
    time: number,
    tempInKelvin: number,
    windMetresPerSec: number,
    uvIndex: number,
    humidity: number,
    precipitation: number,
  ) {
    this.icon = icon;
    this.time = time;
    this.tempInFahrenheit = kelvinToFahrenheit(tempInKelvin);
    this.tempInCelsius = kelvinToCelsius(tempInKelvin);
    this.windMilesPerHour = metresPerSecToMilesPerHour(windMetresPerSec);
    this.windKmPerHour = metresPerSecToKmPerHour(windMetresPerSec);
    this.uvIndex = uvIndex;
    this.humidity = humidity;
    // Probability of precipitation
    this.precipitation = precipitation;
  }
}
