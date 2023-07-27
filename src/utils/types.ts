export interface CoinName {
  fromCoinName: string;
  toCoinName: string;
}

export interface CoinValue {
  fromCoin: string;
  toCoin: string;
}

export interface ExchangedInfo {
  value: string;
  exchangedType: "to" | "from";
}

export interface Props {
  exchangedInfo: ExchangedInfo;
  onChangeFn: (coin: CoinValue) => void;
  coinInfo: CoinName;
}
