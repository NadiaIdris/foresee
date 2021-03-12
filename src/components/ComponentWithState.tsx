import React from "react";
import { MessageProps, CounterState } from "../my-types";
import { NestedComponentUsingState } from "./NestedComponentUsingState";

export class ComponentWithState extends React.Component<MessageProps, CounterState> {
  state = { count: 0 };

  increaseCounter = () => {
    const newCount = this.state.count + 1;
    this.setState({ count: newCount });
  };

  render() {
    return (
      <React.Fragment>
        <div>{this.state.count}</div>
        <button onClick={this.increaseCounter}>{this.props.message}</button>
        <NestedComponentUsingState monkeyCount={this.state.count} />
      </React.Fragment>
    );
  }
}
