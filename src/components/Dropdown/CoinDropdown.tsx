import { styled } from "styled-components";
import { colors } from "../../styles/colors";
import { Coin } from "../Wallet/Wallet";
import { Dispatch, MouseEvent, SetStateAction } from "react";

interface CoinDropdownProps {
  disabledCoinIdList?: number[];
  coin?: Coin;
  open: boolean;
  onToggleDropdown: () => void;
  changeCoin: Dispatch<SetStateAction<Coin>>;
}

const coinList = [
  { coinName: "BnB", id: 1, coinImg: "", coinCount: 1000 },
  { coinName: "Solana", id: 2, coinImg: "", coinCount: 1000 },
  { coinName: "Ethereum", id: 3, coinImg: "", coinCount: 1000 },
];

function CoinDropdown({
  coin,
  disabledCoinIdList,
  open,
  onToggleDropdown,
  changeCoin,
}: CoinDropdownProps) {
  const handleClickOption = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();

    if (!e.currentTarget.dataset) {
      return;
    }

    const { coinId } = e.currentTarget.dataset;

    if (!coinId) {
      return;
    }

    const choosenCoin = coinList.find(
      (coin) => coin.id === parseInt(coinId, 10)
    );

    if (!choosenCoin) {
      return;
    }

    changeCoin(choosenCoin);
  };

  return (
    <>
      <SelectCotainer onClick={onToggleDropdown}>
        <span>{coin?.coinName}</span>
        <Icon
          src={"http://localhost:3000/down_icon-icons.com_61209.png"}
          alt="사진"
        />
        {open && (
          <OptionContainer>
            {coinList.map((coin) => (
              <Option
                key={coin.id}
                disabled={disabledCoinIdList?.includes(coin.id) || false}
                data-coin-id={coin.id}
                onClick={handleClickOption}
              >
                <Icon
                  src={"http://localhost:3000/down_icon-icons.com_61209.png"}
                  width="18px"
                  height="18px"
                  alt="사진"
                />
                <span>{coin.coinName}</span>
              </Option>
            ))}
          </OptionContainer>
        )}
      </SelectCotainer>
    </>
  );
}

export default CoinDropdown;

const SelectCotainer = styled.div`
  width: 153px;
  background-color: ${colors.shade000};
  border: none;
  border-radius: 12px;
  outline: none;

  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.shade900};
  font-weight: 400;
  font-size: 14px;
  text-align: left;

  padding: 10px;

  appearance: none;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const OptionContainer = styled.ul`
  width: 153px;
  background-color: ${colors.shade000};
  border: none;
  border-radius: 16px;
  outline: none;
  box-shadow: 0px 12px 16px 0px #00000026;

  position: absolute;
  top: 58px;
  left: 0;
  margin-top: 4px;
  padding: 8px 10px 8px 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0em;

  z-index: 2;
`;

const Option = styled.li<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;

  color: ${colors.shade900};

  opacity: ${(props) => props.disabled && 0.5};
  cursor: pointer;
  span {
    margin-left: 4px;
  }
`;
