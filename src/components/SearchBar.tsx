import React from "react";
import { setupSearchAndFetchWeatherData } from "../algolia-api/setupSearchAndFetchWeatherData";
import { WeatherReport } from "../model/WeatherReport";

export interface SearchBarProps {
  fetchWeatherDataFromOpenWeather: FetchWeatherDataFromOpenWeather;
}

export interface FetchWeatherDataFromOpenWeather {
  (lat: number, lon: number): void;
}

export interface SaveWeatherReportToState {
  (newWeatherReport: WeatherReport): void;
}

export class SearchBar extends React.Component<SearchBarProps, {}> {
  componentDidMount() {
    setupSearchAndFetchWeatherData(this.props.fetchWeatherDataFromOpenWeather);
  }

  render() {
    return (
      <div className="search-panel">
        <div className="search-panel__filters">
          <div id="clear"></div>
        </div>
        <div className="search-panel__results">
          <input id="searchbox" placeholder="Search location ..." />
        </div>
      </div>
    );
  }
}
