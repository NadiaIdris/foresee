import React from "react";
import "./styles/App.css";
import { MessageProps } from "./my-types";
import { ComponentWithState } from "./components/ComponentWithState";
import { ComponentWithoutState } from "./components/ComponentWithoutState";

function App() {
  return (
    <div>
      <h1>Helloooooo!!!!</h1>
      <ComponentWithState message={"Click me to see the count go up"} />
      <ComponentWithoutState message={"State sucks! - by Negative Component"} />
    </div>
  );
}

export default App;
