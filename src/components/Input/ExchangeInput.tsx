import { ChangeEvent, InputHTMLAttributes, useCallback } from "react";
import { styled } from "styled-components";
import { colors } from "../../styles/colors";
import { changeExchangedValue } from "../../utils/changeExchangedValue";

interface ExchangeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  isError?: boolean;
  fromCoinName: string;
  toCoinName: string;
  exchangedType: "to" | "from";
  onChangeInput: ({
    fromCoin,
    toCoin,
  }: {
    fromCoin: number;
    toCoin: number;
  }) => void;
}

interface InputStyle {
  inputwidth: number | string;
  inputheight: number | string;
}

function ExchangeInput({
  labelText,
  isError,
  width = "472px",
  height = "56px",
  fromCoinName,
  toCoinName,
  exchangedType,
  onChangeInput,
  ...rest
}: ExchangeInputProps) {
  const { placeholder } = rest;

  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      changeExchangedValue({
        exchangedInfo: { value, exchangedType },
        coinInfo: { fromCoinName, toCoinName },
        onChangeFn: onChangeInput,
      });
    },
    [exchangedType, fromCoinName, onChangeInput, toCoinName]
  );

  return (
    <ExchangeInputContainer>
      <LabelText>{labelText}</LabelText>
      <Input
        {...rest}
        placeholder={placeholder}
        inputwidth={width}
        inputheight={height}
        onChange={handleChangeValue}
        type="number"
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
  border: none;
  border-radius: 12px;
  outline: none;

  font-size: 18px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`;
