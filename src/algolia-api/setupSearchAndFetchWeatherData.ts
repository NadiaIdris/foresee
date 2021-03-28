import algoliasearch from "algoliasearch/lite";
// @ts-ignore
import instantsearch from "instantsearch.js";
// @ts-ignore
import { places } from "instantsearch.js/es/widgets";
import isEmpty from "lodash.isempty";
import { FetchWeatherDataFromOpenWeather } from "../components/SearchBar";

const placesJS = require("places.js");

// Constants.
const weatherAppDataKey = "weather";

// Fetch the weather report after user has selected the lat / lon.
const getLatLonAndFetchWeatherData = (
  uiState: any,
  fetchWeatherDataFromOpenWeather: FetchWeatherDataFromOpenWeather,
) => {
  // If no location is typed in the search bar, do not execute the code below.
  const location = uiState[weatherAppDataKey];
  if (isEmpty(location)) return;

  const positionArray: Array<string> = location.places.position.split(",");
  const lat: number = parseFloat(positionArray[0]);
  const lon: number = parseFloat(positionArray[1]);

  console.log("lat=", lat);
  console.log("lon=", lon);
  fetchWeatherDataFromOpenWeather(lat, lon);
};

/**
 * Imports: https://www.algolia.com/doc/guides/building-search-ui/installation/js/
 * Sample code for places: https://codesandbox.io/s/github/algolia/doc-code-samples/tree/master/InstantSearch.js/places?file=/src/app.js
 */
export const setupSearchAndFetchWeatherData = (fetchWeatherDataFromOpenWeather: FetchWeatherDataFromOpenWeather) => {
  const applicationID = "pl8HQG0189VY";
  const searchOnlyAPIKey = "2563ab38a8ce07a8f0c9081eac73122e";
  const searchClient = algoliasearch(applicationID, searchOnlyAPIKey);

  // `instantsearch()` is Algolia's boilerplate code, except the `getLatLonAndFetchWeatherData()` function, which I added
  const search = instantsearch({
    indexName: weatherAppDataKey,
    searchClient,
    onStateChange(
      // @ts-ignore
      { setUiState, uiState },
    ) {
      // Update the UI - https://www.algolia.com/doc/api-reference/widgets/instantsearch/js/#widget-param-onstatechange
      setUiState(uiState);
      getLatLonAndFetchWeatherData(uiState, fetchWeatherDataFromOpenWeather);
    },
  });

  search.addWidgets([
    places({
      container: "#searchbox",
      placesReference: placesJS,
    }),
  ]);

  search.start();
};
