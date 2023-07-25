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

function ExchangedForm() {
  const [walletList, editWallet] = useWalletStore((state) => [
    state.walletList,
    state.editWallet,
  ]);
  const [addExchangedHistory, setLastExchangedHistory] = useExchangedHistory(
    (state) => [state.addExchangedHistory, state.setLastExchangedHistory]
  );
  const [toCoin, setToCoin] = useState<Coin | undefined>(undefined);
  const [fromCoin, setFromCoin] = useState<Coin | undefined>(undefined);
  const [toExchanged, setToExchanged] = useState<string>("");
  const [fromExchanged, setFromExchanged] = useState<string>("");
  const [isError, setIsError] = useState<IsError>({
    toCoin: false,
    fromCoin: false,
  });
  const [toOpen, handleToToggle] = useToggle();
  const [fromOpen, handleFromToggle] = useToggle();

  const disabledButton = useMemo(() => {
    if (!toCoin || !fromCoin) {
      return true;
    }

    if (isError.fromCoin || isError.toCoin) {
      return true;
    }

    if (
      !toExchanged ||
      !fromExchanged ||
      toExchanged === "0" ||
      fromExchanged === "0"
    ) {
      return true;
    }

    return false;
  }, [
    fromCoin,
    fromExchanged,
    isError.fromCoin,
    isError.toCoin,
    toCoin,
    toExchanged,
  ]);
  const handleChangeFromCoin = ({
    fromCoin,
    toCoin,
  }: {
    fromCoin: string;
    toCoin: string;
  }) => {
    setToExchanged(toCoin);
    setFromExchanged(fromCoin);
  };

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    const resultToCoin = {
      ...toCoin,
      coinCount: parseFloat(toExchanged),
    } as Coin;
    const resultFromCoin = {
      ...fromCoin,
      coinCount: parseFloat(fromExchanged),
    } as Coin;
    if (resultFromCoin && resultToCoin) {
      editWallet(resultFromCoin, resultToCoin);
      const newExchangedHistory = {
        time: new Date(),
        to: resultToCoin,
        from: resultFromCoin,
      };
      setLastExchangedHistory(newExchangedHistory);
      addExchangedHistory(newExchangedHistory);
    }
  };

  useEffect(() => {
    if (toExchanged === "0" || fromExchanged === "0") {
      setIsError({ toCoin: true, fromCoin: true });
      return;
    }
    if (!toCoin || !fromCoin) {
      return;
    }

    const isMoreThanToCoinCount = toCoin.coinCount < parseFloat(toExchanged);
    const isMoreThanFromCoinCount =
      fromCoin.coinCount < parseFloat(fromExchanged);

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
  }, [toExchanged, fromExchanged, toCoin, fromCoin]);

  useEffect(() => {
    // CoinDropdown으로 전환 코인을 변경시 해당 코인에 맞는 금액대로 전환한다.
    if (!fromCoin || !toCoin) {
      return;
    }
    changeExchangedValue({
      exchangedInfo: { exchangedType: "to", value: toExchanged },
      coinInfo: {
        fromCoinName: fromCoin.coinName,
        toCoinName: toCoin.coinName,
      },
      onChangeFn: handleChangeFromCoin,
    });
  }, [toCoin?.coinName]);

  useEffect(() => {
    if (!fromCoin || !toCoin) {
      return;
    }
    changeExchangedValue({
      exchangedInfo: { exchangedType: "from", value: fromExchanged },
      coinInfo: {
        fromCoinName: fromCoin.coinName,
        toCoinName: toCoin.coinName,
      },
      onChangeFn: handleChangeFromCoin,
    });
  }, [fromCoin?.coinName]);

  return (
    <>
      <InputContent>
        <ExchangeInput
          labelText="전환 수량 (FROM)"
          value={fromExchanged}
          otherExchanged={toExchanged}
          fromCoinName={fromCoin?.coinName || ""}
          toCoinName={toCoin?.coinName || ""}
          exchangedType="from"
          isError={isError.fromCoin}
          onChangeInput={handleChangeFromCoin}
          disabled={!fromCoin || !toCoin}
        />
        <CoinDropdown
          coin={fromCoin}
          open={fromOpen}
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
          value={toExchanged}
          otherExchanged={fromExchanged}
          fromCoinName={fromCoin?.coinName || ""}
          toCoinName={toCoin?.coinName || ""}
          exchangedType="to"
          isError={isError.toCoin}
          onChangeInput={handleChangeFromCoin}
          disabled={!fromCoin || !toCoin}
        />
        <CoinDropdown
          coin={toCoin}
          open={toOpen}
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
