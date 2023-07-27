import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  useCallback,
  useMemo,
} from "react";
import { css, styled } from "styled-components";
import { colors } from "../../styles/colors";
import { changeExchangedValue } from "../../utils/changeExchangedValue";
import { ExchangedCoin } from "../Form/ExchangedForm";

interface ExchangeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  fromCoin: ExchangedCoin;
  toCoin: ExchangedCoin;
  isError: boolean;
  exchangedType: "to" | "from";
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
  fromCoin,
  toCoin,
  isError,
  width = "472px",
  height = "56px",
  exchangedType,
  onChangeInput,
  ...rest
}: ExchangeInputProps) {
  const { placeholder } = rest;
  const value = exchangedType === "to" ? toCoin.coinCount : fromCoin.coinCount;

  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      if (isError && value === "0") {
        newValue = newValue.includes(".") ? newValue : newValue.substring(1);
      }

      if (
        !/^[0-9,.]+$/.test(newValue) || // 숫자와 . 만 입력
        !/^[\d,]*\.?[\d]{0,10}$/.test(newValue) // 10자리까지 입력
      ) {
        return;
      }

      changeExchangedValue({
        exchangedInfo: {
          value: newValue.replaceAll(",", ""),
          exchangedType,
        },
        coinInfo: {
          fromCoinName: fromCoin.coinName,
          toCoinName: toCoin.coinName,
        },
        onChangeFn: onChangeInput,
      });
    },
    [
      exchangedType,
      fromCoin.coinName,
      isError,
      onChangeInput,
      toCoin.coinName,
      value,
    ]
  );

  const handleRemoveComma = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Backspace") {
        const [int, float] = e.currentTarget.value.split(".");
        if (float?.length === 1) {
          e.preventDefault();
          const coin = {
            fromCoin:
              exchangedType === "from"
                ? int
                : ((toCoin.coinCount as string) || "").split(".")[0],
            toCoin:
              exchangedType === "to"
                ? int
                : ((fromCoin.coinCount as string) || "").split(".")[0],
          };
          onChangeInput(coin);
          return;
        }
        if (int.length === 1) {
          const coin = { fromCoin: "", toCoin: "" };
          onChangeInput(coin);
        }
      }
    },
    [exchangedType, fromCoin.coinCount, onChangeInput, toCoin.coinCount]
  );

  // 숫자 3자리마다 , 추가
  const inputValue = useMemo(() => {
    if (value === "") {
      return "";
    }

    let [int, float] = (value as string).split(".");

    // value가 실수라면 float에 .을 추가해준다.
    if ((value as string).includes(".")) {
      float = ".".concat(float);
    }
    return parseFloat(int.replaceAll(",", ""))
      .toLocaleString("ko-KR")
      .concat(float || "");
  }, [value]);

  return (
    <ExchangeInputContainer>
      <LabelText>{labelText}</LabelText>
      <Input
        {...rest}
        placeholder={placeholder}
        inputwidth={width}
        inputheight={height}
        value={inputValue}
        onKeyDown={handleRemoveComma}
        onChange={handleChangeValue}
        type="text"
        iserror={isError ? 1 : 0}
        disabled={!fromCoin.coinName || !toCoin.coinName}
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
