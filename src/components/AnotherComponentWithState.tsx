import React from "react";
import { WeatherReport } from "../model/WeatherReport";

export class AnotherComponentWithState extends React.Component<{} /* no props */, WeatherReport> {
  render() {
    return (
      <div
        style={{
          backgroundColor: "lightblue",
          padding: "0.5rem",
        }}
      >
        <h2>🌞 WeatherReport 🌞</h2>
        <button onClick={this.makeFetchCall}>{"Fetch!"}</button>
        {/*<button onClick={this.makeFetchCall.bind(this)}>{"Fetch!"}</button>*/}
        <p>{this.getWeatherReportAsString()}</p>
      </div>
    );
  }

  private getWeatherReportAsString() {
    if (this.state == null) {
      return "No state has been set";
    } else {
      return this.state.currentConditions.temperatureInFahrenheit;
    }
  }

  /* private makeFetchCall() { */
  private makeFetchCall = () => {
    WeatherReport.fetchWeatherDataFromOpenWeatherMap((newState: WeatherReport) => {
      console.log(newState);
      this.setState(newState);
    });
  };
}
