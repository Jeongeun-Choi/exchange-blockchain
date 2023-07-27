import { Dispatch, MouseEvent, SetStateAction } from "react";
import { ExchangedCoin } from "../Form/types";

export interface CoinDropdownProps {
  coin?: ExchangedCoin;
  open: boolean;
  disabledCoinId: number;
  dropdownType: string;
  onToggleDropdown: (e: MouseEvent<HTMLDivElement>) => void;
  changeCoin: Dispatch<SetStateAction<ExchangedCoin>>;
}
