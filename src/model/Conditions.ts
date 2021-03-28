import { kelvinToCelsius, kelvinToFahrenheit } from "./utils";

export class Conditions {
  readonly tempInKelvin: number;
  readonly tempInFahrenheit: number;
  readonly tempInCelsius: number;
  readonly icon: string;
  readonly formattedDate: string;

  constructor(tempInKelvin: number, icon: string, formattedDate: string) {
    this.tempInKelvin = tempInKelvin;
    this.tempInFahrenheit = kelvinToFahrenheit(this.tempInKelvin);
    this.tempInCelsius = kelvinToCelsius(this.tempInKelvin);
    this.icon = icon;
    this.formattedDate = formattedDate;
  }
}
