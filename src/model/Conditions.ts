import { convertKelvinToCelsius, convertKelvinToFahrenheit } from "./utils";

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