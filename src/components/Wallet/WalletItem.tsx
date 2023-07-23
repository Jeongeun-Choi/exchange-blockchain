import { styled } from "styled-components";

interface WalletItemProps {
  coinImg: string;
  coinName: string;
  coinCount: number;
}

function WalletItem({ coinImg, coinName, coinCount }: WalletItemProps) {
  return (
    <WalletItemContainer>
      <>
        <img src={coinImg} alt={coinName} />
        <span>{coinName}</span>
      </>
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
