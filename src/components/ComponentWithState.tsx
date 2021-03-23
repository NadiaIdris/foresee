import React from "react";
import { MessageProps, CounterState } from "../my-types";
import { NestedComponentUsingState } from "./NestedComponentUsingState";

export class ComponentWithState extends React.Component<MessageProps, CounterState> {
  state = { count: 0 };

  increaseCounter = () => {
    const newCount = this.state.count + 1;
    this.setState({ count: newCount }, () => {
      /** the state has actually been set now! **/
      console.log("state has actually been set now!");
      console.log(this.state);
    });
    /** the new state has not been set yet! **/
    console.log("you think state has been set, but JS just fucked you (again!)");
    console.log(this.state);
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
