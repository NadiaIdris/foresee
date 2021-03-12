import React from "react";
import { PropsClass, StateClass } from "../my-types";

export class ComponentWithState extends React.Component<PropsClass, StateClass> {
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
      </React.Fragment>
    );
  }
}
