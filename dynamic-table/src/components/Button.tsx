import React from "react";
import { getColorClassName } from "../utils/utils";
import { Color } from "../utils/interfaces";
import { Tooltip } from "./Tooltip";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  backgroundColor?: Color;
  tooltip?: string;
}

export function Button(props: ButtonProps) {
  const { backgroundColor, className, tooltip, ...rest } = props;

  const classNames = ["button", className, getColorClassName(backgroundColor)];

  return tooltip ? (
    <Tooltip text={tooltip}>
      <button {...rest} className={classNames.join(" ")}>
        {props.children}
      </button>
    </Tooltip>
  ) : (
    <button {...rest} className={classNames.join(" ")}>
      {props.children}
    </button>
  );
}
