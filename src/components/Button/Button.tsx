import { PropsWithChildren } from "react";
import { ButtonProps, ButtonStyle } from "./type";
import { css, styled } from "styled-components";

function PlainButton({
  children,
  style,
  width = "100%",
  height = "56px",
  color = "#000",
  backgroundColor,
  buttonType = "text",
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <Button
      width={width}
      height={height}
      color={color}
      backgroundcolor={backgroundColor}
      buttontype={buttonType}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default PlainButton;

const Button = styled.button<ButtonStyle>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  border: none;
  border-radius: 12px;
  padding: 10px, 16px, 10px, 16px;
  font-size: 15px;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 0.05em;

  cursor: pointer;
  ${(props) => {
    switch (props.buttontype) {
      case "text":
        return css`
          background-color: inherit;
        `;
      case "plain":
        return css`
          background-color: ${props.backgroundcolor};
        `;
      default:
        break;
    }
  }}
`;
