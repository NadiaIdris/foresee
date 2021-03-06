import React from "react";
import "../styles/App.css";
import { ComponentWithState } from "./ComponentWithState";
import { ComponentWithoutState } from "./ComponentWithoutState";
import { WeatherReportComponent } from "./WeatherReportComponent";
import { SearchBar } from "./SearchBar";

class App extends React.Component {
  // TODO pass this method down as a props to <SearchBar/>
  fetchWeatherReport = (lat: number, lon: number) => {
    // TODO const saveWeatherReportToState = (newState: WeatherReport) => { this.setState(newState); }
    // TODO WeatherReport.fetchWeatherDataFromOpenWeatherMap(saveWeatherReportToState, lat, lon)
    console.log(`TODO App.fetchWeatherReport for ${lat}, ${lon}`);
  };

  render() {
    return (
      <div
        style={{
          fontFamily: "Hack Nerd Font",
          backgroundColor: "lightgoldenrodyellow",
          padding: "0.5rem",
        }}
      >
        <h1>Hello World</h1>
        <ComponentWithState message={"Click me to see the count go up"} />
        <ComponentWithoutState message={"State sucks! - by Negative Component"} />
        <WeatherReportComponent />
        <SearchBar fetchWeatherReport={this.fetchWeatherReport} />
      </div>
    );
  }
}

export default App;
