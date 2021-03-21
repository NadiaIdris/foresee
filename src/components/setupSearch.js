import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import { places } from "instantsearch.js/es/widgets";

// Imports: https://www.algolia.com/doc/guides/building-search-ui/installation/js/
// Sample code for places: https://codesandbox.io/s/github/algolia/doc-code-samples/tree/master/InstantSearch.js/places?file=/src/app.js

export const setupSearch = () => {
  const applicationID = "pl8HQG0189VY";
  const searchOnlyAPIKey = "2563ab38a8ce07a8f0c9081eac73122e";
  const searchClient = algoliasearch(applicationID, searchOnlyAPIKey);

  const search = instantsearch({
    indexName: "foresee_weather_app",
    searchClient,
    onStateChange({ uiState, setUiState }) {
      const selectedPlaceName = {
        placeName: uiState.foresee_weather_app.places.query,
        position: uiState.foresee_weather_app.places.position,
      };
      console.log(selectedPlaceName);
      setUiState(uiState);
    },
  });

  search.addWidgets([
    places({
      container: "#searchbox",
      placesReference: window.places,
    }),
  ]);

  search.start();
};
