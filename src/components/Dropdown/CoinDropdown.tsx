import { styled } from "styled-components";
import { colors } from "../../styles/colors";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { useWalletStore } from "../../store/useWalletStore";
import { Coin } from "../../types/wallet";
import { useCoinDropdownStore } from "../../store/useCoinDropdownStore";

interface CoinDropdownProps {
  coin?: Coin;
  open: boolean;
  onToggleDropdown: () => void;
  changeCoin: Dispatch<SetStateAction<Coin | undefined>>;
}

function CoinDropdown({
  coin,
  open,
  onToggleDropdown,
  changeCoin,
}: CoinDropdownProps) {
  const coinList = useWalletStore((state) => state.walletList);
  const { disabledCoinId, changeDisabledCoinId } = useCoinDropdownStore(
    (state) => state
  );

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
    changeDisabledCoinId(parseInt(coinId, 10));
  };

  return (
    <>
      <SelectCotainer onClick={onToggleDropdown}>
        <span>{coin?.coinName || "선택하세요"}</span>
        <Icon
          src={"http://localhost:3000/down_icon-icons.com_61209.png"}
          alt="사진"
        />
        {open && (
          <OptionContainer>
            {coinList.map((coin) => (
              <Option
                key={coin.id}
                disabled={disabledCoinId === coin.id || false}
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
