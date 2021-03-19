import React from "react";
import "../styles/App.css";
import { MessageProps } from "../my-types";
import { ComponentWithState } from "./ComponentWithState";
import { ComponentWithoutState } from "./ComponentWithoutState";
import { WeatherReport } from "../model/WeatherReport";
import { AnotherComponentWithState } from "./AnotherComponentWithState";

function App() {
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
      <AnotherComponentWithState />
    </div>
  );
}

export default App;
