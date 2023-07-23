import styled from "styled-components";
import WalletItem from "./WalletItem";

interface Coin {
  id: number;
  coinImg: string;
  coinName: string;
  coinCount: number;
}

interface WalletProps {
  title: string;
  walletList: Coin[];
}

function Wallet({ title, walletList }: WalletProps) {
  return (
    <WalletContainer>
      <WalletTitle>{title}</WalletTitle>
      <hr />
      <WalletContent>
        {walletList.map((coin) => (
          <WalletItem
            coinCount={coin.coinCount}
            coinImg={coin.coinImg}
            coinName={coin.coinName}
          />
        ))}
      </WalletContent>
    </WalletContainer>
  );
}

export default Wallet;

const WalletContainer = styled.div`
  width: 308px;
  height: 386px;
  border-radius: 12px;
  padding: 24px;
  background-color: #fafbfc;
`;

const WalletTitle = styled.div`
  text-align: left;
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
  color: #4c5b7a;
`;

const WalletContent = styled.div`
  display: flex;
  height: inherit;
  flex-direction: column;
  justify-content: space-between;
`;
