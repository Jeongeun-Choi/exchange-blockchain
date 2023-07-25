import { styled } from "styled-components";
import { Wallet } from "../components/Wallet";
import { colors } from "../styles/colors";
import { ExchangedHistory } from "../components/ExchangedHistory";
import { ExchangedForm } from "../components/Form";
import { useExchangedHistory } from "../store/useExchangedHistory";

function ExchangingPage() {
  const lastExchangedHistory = useExchangedHistory(
    (state) => state.lastExchangedHistory
  );

  return (
    <Container>
      <Title>환전하기</Title>
      <Main>
        <Wallet title="지갑" />
        <ExchangedContent>
          <ExchangedForm />
          {lastExchangedHistory && (
            <ExchangedHistory
              time={lastExchangedHistory.time}
              to={lastExchangedHistory.to}
              from={lastExchangedHistory.from}
            />
          )}
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

const ExchangedContent = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
`;
