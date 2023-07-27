import { InputHTMLAttributes } from "react";
import { ExchangedCoin } from "../Form/types";

export interface ExchangeInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  fromCoin: ExchangedCoin;
  toCoin: ExchangedCoin;
  isError: boolean;
  exchangedType: "to" | "from";
  onChangeInput: ({
    fromCoin,
    toCoin,
  }: {
    fromCoin: string;
    toCoin: string;
  }) => void;
}

export interface InputStyle {
  inputwidth: number | string;
  inputheight: number | string;
  iserror: number;
}
