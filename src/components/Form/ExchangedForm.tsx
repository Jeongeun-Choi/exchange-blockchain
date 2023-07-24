import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Button } from "../Button";
import { Coin } from "../Wallet/Wallet";
import { useToggle } from "../../hooks/useToggle";
import { CoinDropdown } from "../Dropdown";
import { ExchangeInput } from "../Input";
import { colors } from "../../styles/colors";
import { changeExchangedValue } from "../../utils/changeExchangedValue";

function ExchangedForm() {
  const [toCoin, setToCoin] = useState<Coin>({
    coinName: "Solana",
    id: 2,
    coinImg: "",
    coinCount: 1000,
  });
  const [fromCoin, setFromCoin] = useState<Coin>({
    coinName: "Ethereum",
    id: 3,
    coinImg: "",
    coinCount: 1000,
  });
  const [toExchanged, setToExchanged] = useState(100);
  const [fromExchanged, setFromExchanged] = useState(1);

  const [toOpen, handleToToggle] = useToggle();
  const [fromOpen, handleFromToggle] = useToggle();

  const handleChangeFromCoin = ({
    fromCoin,
    toCoin,
  }: {
    fromCoin: number;
    toCoin: number;
  }) => {
    setToExchanged(toCoin);
    setFromExchanged(fromCoin);
  };

  useEffect(() => {
    changeExchangedValue({
      exchangedInfo: { exchangedType: "to", value: toExchanged },
      coinInfo: {
        fromCoinName: fromCoin.coinName,
        toCoinName: toCoin.coinName,
      },
      onChangeFn: handleChangeFromCoin,
    });
  }, [toCoin.coinName]);

  useEffect(() => {
    changeExchangedValue({
      exchangedInfo: { exchangedType: "from", value: fromExchanged },
      coinInfo: {
        fromCoinName: fromCoin.coinName,
        toCoinName: toCoin.coinName,
      },
      onChangeFn: handleChangeFromCoin,
    });
  }, [fromCoin.coinName]);

  return (
    <>
      <InputContent>
        <ExchangeInput
          labelText="전환 수량 (FROM)"
          value={fromExchanged}
          fromCoinName={fromCoin.coinName}
          toCoinName={toCoin.coinName}
          exchangedType="from"
          onChangeInput={handleChangeFromCoin}
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
          fromCoinName={fromCoin.coinName}
          toCoinName={toCoin.coinName}
          exchangedType="to"
          onChangeInput={handleChangeFromCoin}
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
