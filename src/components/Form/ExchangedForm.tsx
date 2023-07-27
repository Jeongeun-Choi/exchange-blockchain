import { MouseEvent, useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { Button } from "../Button";
import { useToggle } from "../../hooks/useToggle";
import { CoinDropdown } from "../Dropdown";
import { ExchangeInput } from "../Input";
import { colors } from "../../styles/colors";
import { changeExchangedValue } from "../../utils/changeExchangedValue";
import { useWalletStore } from "../../store/useWalletStore";
import { Coin } from "../../types/wallet";
import { useExchangedHistory } from "../../store/useExchangedHistory";

export interface IsError {
  toCoin: boolean;
  fromCoin: boolean;
}

export interface ExchangedCoin extends Omit<Coin, "coinCount"> {
  coinCount: string | number;
}

interface DisabledCoinId {
  fromCoinId: number;
  toCoinId: number;
}

const initExchangedCoin = {
  id: 0,
  coinName: "",
  coinCount: "",
  coinImg: "",
};

function ExchangedForm() {
  const [walletList, editWallet] = useWalletStore((state) => [
    state.walletList,
    state.editWallet,
  ]);

  const [addExchangedHistory, setLastExchangedHistory] = useExchangedHistory(
    (state) => [state.addExchangedHistory, state.setLastExchangedHistory]
  );
  const [toCoin, setToCoin] = useState<ExchangedCoin>(initExchangedCoin);
  const [fromCoin, setFromCoin] = useState<ExchangedCoin>(initExchangedCoin);
  const [isError, setIsError] = useState<IsError>({
    toCoin: false,
    fromCoin: false,
  });
  const [disabledCoinId, setDisabledCoinId] = useState<DisabledCoinId>({
    fromCoinId: 0,
    toCoinId: 0,
  });
  const [toOpen, handleToToggle] = useToggle();
  const [fromOpen, handleFromToggle] = useToggle();

  const disabledButton = useMemo(() => {
    // 선택된 코인이 없을때
    if (!toCoin.coinName || !fromCoin.coinName) {
      return true;
    }

    if (isError.fromCoin || isError.toCoin) {
      return true;
    }

    if (
      !toCoin.coinCount ||
      !fromCoin.coinCount ||
      toCoin.coinCount === "0" ||
      fromCoin.coinCount === "0"
    ) {
      return true;
    }

    return false;
  }, [
    fromCoin.coinCount,
    fromCoin.coinName,
    isError.fromCoin,
    isError.toCoin,
    toCoin.coinCount,
    toCoin.coinName,
  ]);

  const stringToFloat = (coinCount: string) => {
    let [int, float] = coinCount.split(".");
    int = int.replaceAll(",", "");

    if (float && coinCount.includes(".")) {
      float = ".".concat(float);
    }

    return parseFloat(int.concat(float));
  };

  const handleChangeFromCoin = ({
    fromCoin,
    toCoin,
  }: {
    fromCoin: string;
    toCoin: string;
  }) => {
    setToCoin((prev) => ({ ...prev, coinCount: toCoin }));
    setFromCoin((prev) => ({ ...prev, coinCount: fromCoin }));
  };

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    const resultToCoin = {
      id: toCoin.id,
      coinCount: Math.floor(parseFloat(toCoin.coinCount as string) * 100) / 100,
      coinName: toCoin.coinName,
      coinImg: toCoin.coinImg,
    };
    const resultFromCoin = {
      id: fromCoin.id,
      coinCount:
        Math.floor(parseFloat(fromCoin.coinCount as string) * 100) / 100,
      coinName: fromCoin.coinName,
      coinImg: fromCoin.coinImg,
    };

    if (resultFromCoin && resultToCoin) {
      editWallet(resultFromCoin, resultToCoin);
      const newExchangedHistory = {
        time: new Date(),
        to: resultToCoin,
        from: resultFromCoin,
      };
      setLastExchangedHistory(newExchangedHistory);
      addExchangedHistory(newExchangedHistory);

      setToCoin(initExchangedCoin);
      setFromCoin(initExchangedCoin);
    }
  };

  /* 
    환전 버튼 disabled 조건
    - Input이 `error` 상태인 경우
    - 코인 선택이 안 된 경우
    - 입력된 값이 없는 경우
  */
  useEffect(() => {
    if (toCoin.coinCount === "0" || fromCoin.coinCount === "0") {
      setIsError({ toCoin: true, fromCoin: true });
      return;
    }
    if (!toCoin.coinName || !fromCoin.coinName) {
      return;
    }

    const toExchanged = stringToFloat(toCoin.coinCount as string);
    const FromExchanged = stringToFloat(fromCoin.coinCount as string);

    const originalToCoin =
      walletList.find((coin) => coin.id === toCoin.id)?.coinCount || 0;
    const originalFromCoin =
      walletList.find((coin) => coin.id === fromCoin.id)?.coinCount || 0;

    const isMoreThanToCoinCount = originalToCoin < toExchanged;
    const isMoreThanFromCoinCount = originalFromCoin < FromExchanged;

    if (isMoreThanToCoinCount) {
      setIsError((prev) => ({ ...prev, toCoin: true }));
    } else {
      setIsError((prev) => ({ ...prev, toCoin: false }));
    }

    if (isMoreThanFromCoinCount) {
      setIsError((prev) => ({
        ...prev,
        fromCoin: true,
      }));
    } else {
      setIsError((prev) => ({ ...prev, fromCoin: false }));
    }
  }, [toCoin, fromCoin, walletList]);

  useEffect(() => {
    // CoinDropdown으로 전환 코인을 변경시 해당 코인에 맞는 금액대로 전환한다.
    if (!fromCoin || !toCoin) {
      return;
    }
    changeExchangedValue({
      exchangedInfo: { exchangedType: "to", value: toCoin.coinCount as string },
      coinInfo: {
        fromCoinName: fromCoin.coinName,
        toCoinName: toCoin.coinName,
      },
      onChangeFn: handleChangeFromCoin,
    });

    if (disabledCoinId.toCoinId !== toCoin.id) {
      setDisabledCoinId({
        toCoinId: fromCoin.id || toCoin.id,
        fromCoinId: toCoin.id,
      });
    }
  }, [toCoin?.coinName]);

  useEffect(() => {
    if (!fromCoin || !toCoin) {
      return;
    }
    changeExchangedValue({
      exchangedInfo: {
        exchangedType: "from",
        value: fromCoin.coinCount as string,
      },
      coinInfo: {
        fromCoinName: fromCoin.coinName,
        toCoinName: toCoin.coinName,
      },
      onChangeFn: handleChangeFromCoin,
    });
    if (disabledCoinId.fromCoinId !== fromCoin.id) {
      setDisabledCoinId({
        fromCoinId: toCoin.id || fromCoin.id,
        toCoinId: fromCoin.id,
      });
    }
  }, [fromCoin?.coinName]);

  return (
    <>
      <InputContent>
        <ExchangeInput
          labelText="전환 수량 (FROM)"
          fromCoin={fromCoin}
          toCoin={toCoin}
          exchangedType="from"
          isError={isError.fromCoin}
          onChangeInput={handleChangeFromCoin}
        />
        <CoinDropdown
          coin={fromCoin}
          open={fromOpen}
          disabledCoinId={disabledCoinId.fromCoinId}
          onToggleDropdown={handleFromToggle}
          changeCoin={setFromCoin}
        />
      </InputContent>
      <img
        src="http://localhost:3000/arrow_bidirectional_up_down_filled_icon_201017.png"
        alt="양방향 화살표"
        width={40}
        height={40}
      />
      <InputContent>
        <ExchangeInput
          labelText="전환 수량 (TO)"
          toCoin={toCoin}
          fromCoin={fromCoin}
          exchangedType="to"
          isError={isError.toCoin}
          onChangeInput={handleChangeFromCoin}
        />
        <CoinDropdown
          coin={toCoin}
          open={toOpen}
          disabledCoinId={disabledCoinId.toCoinId}
          onToggleDropdown={handleToToggle}
          changeCoin={setToCoin}
        />
      </InputContent>
      <CustomButton
        buttonType="plain"
        backgroundColor={colors.primary100}
        color="#fff"
        onClick={handleSubmit}
        disabled={disabledButton}
      >
        환전
      </CustomButton>
    </>
  );
}

export default ExchangedForm;

const InputContent = styled.div`
  width: 100%;
  display: flex;

  input {
    margin-right: 10px;
  }
`;

const CustomButton = styled(Button)`
  margin-top: 20px;
`;
