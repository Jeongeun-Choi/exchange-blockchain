import { ButtonHTMLAttributes, CSSProperties } from "react";

export type ButtonType = "text" | "plain";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  style?: CSSProperties;
  backgroundColor?: string;
  width?: string | number;
  height?: string | number;
  buttonType?: ButtonType;
}

export interface ButtonStyle {
  width?: string | number;
  height?: string | number;
  color?: string;
  backgroundcolor?: string;
  buttontype?: ButtonType;
}
