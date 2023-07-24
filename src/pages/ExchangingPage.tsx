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
import { ExchangedForm } from "../components/Form";

const coinList = [
  { coinName: "BnB", id: 1, coinImg: "", coinCount: 1000 },
  { coinName: "Solana", id: 2, coinImg: "", coinCount: 1000 },
  { coinName: "Ethereum", id: 3, coinImg: "", coinCount: 1000 },
  { coinName: "Ethereum", id: 3, coinImg: "", coinCount: 1000 },
  { coinName: "Ethereum", id: 3, coinImg: "", coinCount: 1000 },
];
function ExchangingPage() {
  return (
    <Container>
      <Title>환전하기</Title>
      <Main>
        <Wallet title="지갑" walletList={coinList} />
        <ExchangedContent>
          <ExchangedForm />
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

const ExchangedContent = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
`;
