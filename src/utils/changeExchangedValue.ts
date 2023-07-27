const defaultCoinCount: { [key: string]: number } = {
  Ethereum: 1,
  BnB: 50,
  Solana: 100,
};

interface CoinName {
  fromCoinName: string;
  toCoinName: string;
}

interface CoinValue {
  fromCoin: string;
  toCoin: string;
}

interface ExchangedInfo {
  value: string;
  exchangedType: "to" | "from";
}
interface Props {
  exchangedInfo: ExchangedInfo;
  onChangeFn: (coin: CoinValue) => void;
  coinInfo: CoinName;
}

// value에 . 붙여주는 함수
const parseFixedNum = (float: string, value: string) => {
  return float === "" && !value.includes(".") ? value.concat(".") : value;
};

export const changeExchangedValue = ({
  exchangedInfo,
  onChangeFn,
  coinInfo,
}: Props) => {
  const coin = { fromCoin: "0", toCoin: "0" };
  const { value, exchangedType } = exchangedInfo;
  const { toCoinName, fromCoinName } = coinInfo;
  if (!value) {
    return;
  }

  const float = value.split(".")[1];

  if (value === "0") {
    onChangeFn(coin);
    return;
  }

  const multiRatio =
    defaultCoinCount[toCoinName] / defaultCoinCount[fromCoinName];
  const divideRatio =
    defaultCoinCount[fromCoinName] / defaultCoinCount[toCoinName];

  coin.fromCoin =
    exchangedType === "from"
      ? value
      : parseFixedNum(float, (parseFloat(value) * divideRatio).toString());
  coin.toCoin =
    exchangedType === "to"
      ? value
      : parseFixedNum(float, (parseFloat(value) * multiRatio).toString());

  onChangeFn(coin);
};
