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
        <span>
          {from?.coinCount}
          {from?.coinName.substring(0, 3)}
        </span>
        <Icon
          src="http://localhost:3000/playsymbol_120625.png"
          alt="오른쪽 화살표"
        />

        <span>
          {to?.coinCount}
          {to?.coinName.substring(0, 3)}
        </span>
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
`;

const Icon = styled.img`
  width: 14px;
  height: 14px;
`;
