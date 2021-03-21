import { WeatherReport } from "./model/WeatherReport";

export interface MessageProps {
  message: string;
}

export interface CounterState {
  count: number;
}

export interface MonkeyCountProps {
  monkeyCount: number;
}

export interface SaveWeatherReportToState {
  (newState: WeatherReport): void;
}
