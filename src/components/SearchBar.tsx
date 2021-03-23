import React from "react";
import { setupSearchAndFetchWeatherData } from "../algolia-api/setupSearchAndFetchWeatherData";

export interface FetchWeatherReportFunction {
  (lat: number, lon: number): void;
}
export interface SearchBarProps {
  fetchWeatherReport: FetchWeatherReportFunction;
}

export class SearchBar extends React.Component<SearchBarProps, {}> {
  componentDidMount() {
    setupSearchAndFetchWeatherData(this.props.fetchWeatherReport);
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
