import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  useCallback,
} from "react";
import { css, styled } from "styled-components";
import { colors } from "../../styles/colors";
import { changeExchangedValue } from "../../utils/changeExchangedValue";

interface ExchangeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  isError: boolean;
  fromCoinName: string;
  toCoinName: string;
  exchangedType: "to" | "from";
  otherExchanged: string;
  onChangeInput: ({
    fromCoin,
    toCoin,
  }: {
    fromCoin: string;
    toCoin: string;
  }) => void;
}

interface InputStyle {
  inputwidth: number | string;
  inputheight: number | string;
  iserror: number;
}

function ExchangeInput({
  labelText,
  isError,
  width = "472px",
  height = "56px",
  fromCoinName,
  toCoinName,
  exchangedType,
  otherExchanged,
  onChangeInput,
  ...rest
}: ExchangeInputProps) {
  const { placeholder, value } = rest;

  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;
      if (isError && value === "0") {
        newValue = newValue.substring(1);
      }

      if (
        !/^[0-9,.]+$/.test(newValue) ||
        !/^[\d,]*\.?[\d]{0,10}$/.test(newValue)
      ) {
        return;
      }

      changeExchangedValue({
        exchangedInfo: {
          value: newValue.replaceAll(",", ""),
          exchangedType,
        },
        coinInfo: { fromCoinName, toCoinName },
        onChangeFn: onChangeInput,
      });
    },
    [exchangedType, fromCoinName, isError, onChangeInput, toCoinName, value]
  );

  const handleRemoveComma = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Backspace") {
        const [int, float] = e.currentTarget.value.split(".");
        if (float?.length === 1) {
          e.preventDefault();
          const coin = {
            fromCoin:
              exchangedType === "from" ? int : otherExchanged.split(".")[0],
            toCoin: exchangedType === "to" ? int : otherExchanged.split(".")[0],
          };
          onChangeInput(coin);
          return;
        }
        if (int.length === 1) {
          const coin = { fromCoin: "0", toCoin: "0" };
          onChangeInput(coin);
        }
      }
    },
    [exchangedType, onChangeInput, otherExchanged]
  );

  return (
    <ExchangeInputContainer>
      <LabelText>{labelText}</LabelText>
      <Input
        {...rest}
        placeholder={placeholder}
        inputwidth={width}
        inputheight={height}
        value={value?.toLocaleString("ko-KR")}
        onKeyDown={handleRemoveComma}
        onChange={handleChangeValue}
        type="text"
        iserror={isError ? 1 : 0}
      />
    </ExchangeInputContainer>
  );
}

export default ExchangeInput;

const ExchangeInputContainer = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const LabelText = styled.span`
  position: absolute;
  top: 12px;
  left: 14px;
  font-size: 12px;
  line-height: 12px;
  font-weight: 600;
`;

const Input = styled.input<InputStyle>`
  box-sizing: border-box;
  width: ${(props) => props.inputwidth || "100%"};
  height: ${(props) => props.inputheight || "56px"};
  background-color: ${colors.shade000};
  padding: 26px 16px 10px 14px;
  border-radius: 12px;
  ${(props) => {
    if (props.iserror) {
      return css`
        border: 1px solid ${colors.error100};
      `;
    }
    return css`
      border: none;
    `;
  }}
  outline: none;

  font-size: 18px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`;
