import { MessageProps } from "../my-types";

export const ComponentWithoutState = (props: MessageProps) => {
  return <p>{props.message}</p>;
};
