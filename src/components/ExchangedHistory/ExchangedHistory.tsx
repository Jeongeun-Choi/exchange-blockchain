import { styled } from "styled-components";
import { colors } from "../../styles/colors";
import dayjs from "dayjs";
import { Coin } from "../../types/wallet";

interface ExchangedHistoryProps {
  time: Date;
  to?: Coin;
  from?: Coin;
}
function ExchangedHistory({ time, to, from }: ExchangedHistoryProps) {
  return (
    <Box>
      <Time>{dayjs(time).format("YYYY-MM-DD, A hh:mm")}</Time>
      <ExchangedInfo>
        <CoinInfo>
          <img
            src={from?.coinImg}
            alt={from?.coinName}
            width={18}
            height={18}
          />
          <span>
            {from?.coinCount.toLocaleString("ko-KR")}
            {from?.coinName.substring(0, 3)}
          </span>
        </CoinInfo>
        <Icon>→</Icon>
        <CoinInfo>
          <img src={to?.coinImg} alt={to?.coinName} width={18} height={18} />
          <span>
            {to?.coinCount.toLocaleString("ko-KR")}
            {to?.coinName.substring(0, 3)}
          </span>
        </CoinInfo>
      </ExchangedInfo>
    </Box>
  );
}

export default ExchangedHistory;

const Box = styled.div`
  width: 100%;
  height: 48px;
  padding: 8px 16px 8px 16px;
  margin-top: 20px;
  border-radius: 12px;
  background-color: ${colors.shade100};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Time = styled.div`
  color: ${colors.shade900};
  line-height: 24.92px;
`;

const ExchangedInfo = styled.div`
  color: ${colors.shade700};
  font-size: 18px;
  font-weight: 600;
  line-height: 32px;

  display: flex;
`;

const CoinInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 4px;
  }
`;

const Icon = styled.div`
  width: 16px;
  height: 16px;
  font-weight: bold;

  margin: 0 6px;
`;
