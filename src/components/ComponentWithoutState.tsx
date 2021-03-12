import { PropsClass } from "../my-types";

export const ComponentWithoutState = (props: PropsClass) => {
  return <p>{props.message}</p>;
};
