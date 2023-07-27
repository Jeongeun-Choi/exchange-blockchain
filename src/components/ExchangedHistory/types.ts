import { Coin } from "../../types/coin";

export interface ExchangedHistoryProps {
  time: Date;
  to?: Coin;
  from?: Coin;
}
