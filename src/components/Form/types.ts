import { Coin } from "../../types/coin";

export interface IsError {
  toCoin: boolean;
  fromCoin: boolean;
}

export interface ExchangedCoin extends Omit<Coin, "coinCount"> {
  coinCount: string | number;
}

export interface DisabledCoinId {
  fromCoinId: number;
  toCoinId: number;
}
