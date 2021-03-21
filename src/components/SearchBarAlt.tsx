import React from "react";
import { setupSearch } from "./setupSearch";

export interface FetchWeatherReportFunction {
  (lat: number, lon: number): void;
}
export interface SearchBarAltProps {
  fetchWeatherReport: FetchWeatherReportFunction;
}

export class SearchBarAlt extends React.Component<SearchBarAltProps, {}> {
  componentDidMount() {
    setupSearch(this.props.fetchWeatherReport);
  }

  render() {
    return (
      <div className="search-panel">
        <div className="search-panel__filters">
          <div id="clear"></div>
        </div>
        <div className="search-panel__results">
          <input id="searchbox" />
        </div>
      </div>
    );
  }
}
