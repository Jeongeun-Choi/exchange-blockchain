import { styled } from "styled-components";
import { Button } from "../components/Button";
import { ExchangeInput } from "../components/Input";
import { Wallet } from "../components/Wallet";
import { colors } from "../styles/colors";
import { ExchangedHistory } from "../components/ExchangedHistory";
import { CoinDropdown } from "../components/Dropdown";
import { useState } from "react";
import { Coin } from "../components/Wallet/Wallet";
import { useToggle } from "../hooks/useToggle";

const coinList = [
  { coinName: "BnB", id: 1, coinImg: "", coinCount: 1000 },
  { coinName: "Solana", id: 2, coinImg: "", coinCount: 1000 },
  { coinName: "Ethereum", id: 3, coinImg: "", coinCount: 1000 },
  { coinName: "Ethereum", id: 3, coinImg: "", coinCount: 1000 },
  { coinName: "Ethereum", id: 3, coinImg: "", coinCount: 1000 },
];
function ExchangingPage() {
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

  return (
    <Container>
      <Title>환전하기</Title>
      <Main>
        <Wallet title="지갑" walletList={coinList} />
        <ExchangedContent>
          <InputContent>
            <ExchangeInput labelText="전환 수량 (FROM)" value={fromExchanged} />
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
            <ExchangeInput labelText="전환 수량 (TO)" value={toExchanged} />
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
          <ExchangedHistory
            time={new Date()}
            to={coinList[0]}
            from={coinList[1]}
          />
        </ExchangedContent>
      </Main>
    </Container>
  );
}

export default ExchangingPage;

const Container = styled.div`
  width: 960px;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  width: 960px;
  display: flex;
`;

const Title = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: ${colors.shade700};
`;

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

const ExchangedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
`;
