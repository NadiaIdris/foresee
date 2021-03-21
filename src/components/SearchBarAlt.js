import React from "react";
import { setupSearch } from "./setupSearch";

class SearchBarAlt extends React.Component {
  componentDidMount() {
    setupSearch();
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

export default SearchBarAlt;
