import { PropsWithChildren } from "react";

export function Card(
  props: PropsWithChildren<{
    text: string;
    isRevealed: boolean;
    handleClick: () => void;
  }>
) {
  const text = props.isRevealed ? props.text : "";
  const handleClick = props.handleClick;
  return (
    <div onClick={handleClick} className="Card">
      {text}
      {props.isRevealed ? props.children : ""};
    </div>
  );
}
