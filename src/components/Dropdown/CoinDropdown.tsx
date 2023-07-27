import { styled } from "styled-components";
import { colors } from "../../styles/colors";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { useWalletStore } from "../../store/useWalletStore";
import { ExchangedCoin } from "../Form/ExchangedForm";

interface CoinDropdownProps {
  coin?: ExchangedCoin;
  open: boolean;
  disabledCoinId: number;
  onToggleDropdown: () => void;
  changeCoin: Dispatch<SetStateAction<ExchangedCoin>>;
}

function CoinDropdown({
  coin,
  open,
  disabledCoinId,
  onToggleDropdown,
  changeCoin,
}: CoinDropdownProps) {
  const coinList = useWalletStore((state) => state.walletList);

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

    changeCoin((prev) => ({ ...choosenCoin, coinCount: prev.coinCount }));
  };

  return (
    <>
      <SelectCotainer onClick={onToggleDropdown}>
        <Left>
          {coin?.coinName && (
            <img
              src={coin?.coinImg}
              alt={coin?.coinName}
              width={18}
              height={18}
            />
          )}
          <span>{coin?.coinName || "선택하세요"}</span>
        </Left>
        <Icon src={"/icons/arrow-down_119013.svg"} alt="사진" />
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
                  src={coin.coinImg}
                  width={16}
                  height={16}
                  alt={coin.coinName}
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

const Left = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 4px;
  }
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
  cursor: ${(props) => (!props.disabled ? "pointer" : "not-allowed")};
  span {
    margin-left: 4px;
  }
`;
