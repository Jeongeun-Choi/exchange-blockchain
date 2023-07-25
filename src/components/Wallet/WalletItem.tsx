import { styled } from "styled-components";

interface WalletItemProps {
  coinImg: string;
  coinName: string;
  coinCount: number;
}

function WalletItem({ coinImg, coinName, coinCount }: WalletItemProps) {
  return (
    <WalletItemContainer>
      <ItemTitle>
        <img src={coinImg} alt={coinName} width={16} height={16} />
        <span>{coinName}</span>
      </ItemTitle>
      <div>{coinCount}</div>
    </WalletItemContainer>
  );
}

export default WalletItem;

const WalletItemContainer = styled.div`
  width: 260px;
  height: 77px;
  text-align: left;
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
`;
