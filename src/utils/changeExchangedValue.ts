import { Props } from "./types";

const defaultCoinCount: { [key: string]: number } = {
  Ethereum: 1,
  BnB: 50,
  Solana: 100,
};

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

  // from input 입력시 to input 영역에 fromCount에서 얼마의 비율을 곱해야 toCount가 나오는지 알기 위한 비율 계산
  const toRatio = defaultCoinCount[toCoinName] / defaultCoinCount[fromCoinName];

  // to input 입력시 from input 영역에 toCount에서 얼마의 비율을 곱해야 fromCount가 나오는지 알기 위한 비율 계산
  const fromRatio =
    defaultCoinCount[fromCoinName] / defaultCoinCount[toCoinName];

  coin.fromCoin =
    exchangedType === "from"
      ? value
      : parseFixedNum(float, (parseFloat(value) * fromRatio).toString());
  coin.toCoin =
    exchangedType === "to"
      ? value
      : parseFixedNum(float, (parseFloat(value) * toRatio).toString());

  onChangeFn(coin);
};
