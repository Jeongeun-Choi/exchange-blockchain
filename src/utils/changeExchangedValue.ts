const coinPriority: { [key: string]: number } = {
  Ethereum: 1,
  BnB: 2,
  Solana: 3,
};

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
  fromCoin: number;
  toCoin: number;
}

interface ExchangedInfo {
  value: number;
  exchangedType: "to" | "from";
}
interface Props {
  exchangedInfo: ExchangedInfo;
  onChangeFn: (coin: CoinValue) => void;
  coinInfo: CoinName;
}

export const changeExchangedValue = ({
  exchangedInfo,
  onChangeFn,
  coinInfo,
}: Props) => {
  const coin = { fromCoin: 0, toCoin: 0 };
  const { value, exchangedType } = exchangedInfo;
  const { toCoinName, fromCoinName } = coinInfo;

  if (!value) {
    onChangeFn(coin);
    return;
  }
  // 우선순위가 같으면 to, from 둘 다 같은 금액
  if (
    coinPriority[coinInfo.fromCoinName] === coinPriority[coinInfo.toCoinName]
  ) {
    coin.fromCoin = value;
    coin.toCoin = value;
    onChangeFn(coin);
    return;
  }

  const multiRatio =
    defaultCoinCount[toCoinName] / defaultCoinCount[fromCoinName];
  const divideRatio =
    defaultCoinCount[fromCoinName] / defaultCoinCount[toCoinName];
  // 우선순위가 from이 to보다 더 크면 (숫자가 더 작으면)
  if (coinPriority[fromCoinName] < coinPriority[toCoinName]) {
    coin.fromCoin = exchangedType === "from" ? value : value * divideRatio;
    coin.toCoin = exchangedType === "to" ? value : value * multiRatio;

    onChangeFn(coin);
    return;
  }

  // 우선순위가 from이 to보다 작으면 (숫자가 더 크면)
  coin.fromCoin = exchangedType === "from" ? value : value * multiRatio;
  coin.toCoin = exchangedType === "to" ? value : value * divideRatio;

  onChangeFn(coin);
};
