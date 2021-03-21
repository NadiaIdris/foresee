import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import { places } from "instantsearch.js/es/widgets";
import { FetchWeatherReportFunction, SearchBarAltProps } from "./SearchBarAlt";
import _ from "lodash";

// Imports: https://www.algolia.com/doc/guides/building-search-ui/installation/js/
// Sample code for places: https://codesandbox.io/s/github/algolia/doc-code-samples/tree/master/InstantSearch.js/places?file=/src/app.js

export const setupSearch = (fetchWeatherReport /* : FetchWeatherReportFunction */) => {
  const applicationID = "pl8HQG0189VY";
  const searchOnlyAPIKey = "2563ab38a8ce07a8f0c9081eac73122e";
  const searchClient = algoliasearch(applicationID, searchOnlyAPIKey);

  const weatherAppDataKey = "weather";
  const search = instantsearch({
    indexName: weatherAppDataKey,
    searchClient,
    onStateChange({ uiState, setUiState }) {
      // Update the UI - https://www.algolia.com/doc/api-reference/widgets/instantsearch/js/#widget-param-onstatechange
      setUiState(uiState);

      // Check to see if fetchWeatherReport() can be called.
      // https://lodash.com/docs/#has
      if (!_.has(uiState, `${weatherAppDataKey}.places.position`)) return;

      // const placeName = uiState.foresee_weather_app.places.query;
      const positionArray = uiState[weatherAppDataKey].places.position.split(",");
      const lat = positionArray[0];
      const lon = positionArray[1];
      // console.log("placeName=", placeName);
      console.log("lat=", lat);
      console.log("lon=", lon);
      fetchWeatherReport(lat, lon);
    },
  });

  search.addWidgets([
    places({
      container: "#searchbox",
      placesReference: require("places.js"),
    }),
  ]);

  search.start();
};
