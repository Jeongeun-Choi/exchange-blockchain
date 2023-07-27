import { styled } from "styled-components";
import { useExchangedHistory } from "../store/useExchangedHistory";
import { colors } from "../styles/colors";
import { ExchangedHistory } from "../components/ExchangedHistory";
import { useState } from "react";

function ExchangedHistoryPage() {
  const [exchangedHistoryList, sortExchangedHistory] = useExchangedHistory(
    (state) => [state.exchangedHistoryList, state.sortExchangedHistory]
  );
  const [filterType, setFilterType] = useState<string>("desc");

  const handleClickFilter = () => {
    let newFilterType = "desc";

    if (filterType === "desc") {
      newFilterType = "asc";
    }
    sortExchangedHistory();
    setFilterType(newFilterType);
  };

  return (
    <Container>
      <Title>환전내역</Title>
      <Main>
        <HistoryFilter>
          <span onClick={handleClickFilter}>
            환전 시간 {filterType === "desc" ? "↓" : "↑"}
          </span>
          <span>환전 금액</span>
        </HistoryFilter>
        {exchangedHistoryList.map((history) => (
          <ExchangedHistory
            key={history.time.getMilliseconds()}
            time={history.time}
            to={history.to}
            from={history.from}
          />
        ))}
      </Main>
    </Container>
  );
}

export default ExchangedHistoryPage;

const Container = styled.div`
  width: 960px;
  height: 70%;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  width: 960px;
`;

const Title = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: ${colors.shade700};
`;

const HistoryFilter = styled.div`
  width: 100%;
  height: 48px;
  padding: 8px 16px 8px 16px;
  margin-top: 20px;
  border-radius: 12px;
  background-color: ${colors.shade100};
  color: ${colors.shade900};
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span:first-child {
    cursor: pointer;
  }
`;
