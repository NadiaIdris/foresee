import React from "react";
import { MonkeyCountProps } from "../my-types";

export const NestedComponentUsingState = (props: MonkeyCountProps) => {
  return <p>{"🙈".repeat(props.monkeyCount)}</p>;
};
