import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import Places from "../places/widget.js";

const applicationID: string = "pl8HQG0189VY";
const searchOnlyAPIKey: string = "2563ab38a8ce07a8f0c9081eac73122e";
const searchClient = algoliasearch(applicationID, searchOnlyAPIKey);

const SearchBar = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="weather-search-bar">
      <Places
        defaultRefinement={{
          lat: 37.7793,
          lng: -122.419,
        }}
      />
    </InstantSearch>
  );
};

export default SearchBar;
