import React from "react";
import "../styles/App.css";
import { SaveWeatherReportToState, SearchBar } from "./SearchBar";
import { WeatherReport } from "../model/WeatherReport";
import axios from "axios";

class App extends React.Component {
  // This method is a higher order function that is passed down as a props to <SearchBar/>
  saveWeatherReportToState: SaveWeatherReportToState = (newWeatherReport: WeatherReport) => {
    this.setState(newWeatherReport, () => {
      console.log(this.state);
    });
  };

  fetchWeatherDataFromOpenWeather = async (lat: number = 40.7398, lon: number = -73.9354) => {
    const exclude = "exclude=minutely,alerts";
    const apikey = `appid=${WeatherReport.API_KEY}`;
    const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&${exclude}&${apikey}`;

    axios
      .get(endpoint)
      .then((res) => {
        const data: any = res.data;
        const weatherReport: WeatherReport = WeatherReport.cleanupWeatherDataFromApi(data);
        this.saveWeatherReportToState(weatherReport);
      })
      .catch((err) => {
        if (err.response) {
          // How to handle API errors: https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
          // TODO: handle the error messages
          // client received an error response (5xx, 4xx)
        } else if (err.request) {
          // client never received a response, or request never left
        } else {
          // anything else
        }
      });
  };

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <SearchBar fetchWeatherDataFromOpenWeather={this.fetchWeatherDataFromOpenWeather} />
      </div>
    );
  }
}

export default App;
