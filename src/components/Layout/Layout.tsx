import { PropsWithChildren } from "react";
import { Button } from "../Button";
import { styled } from "styled-components";
import { colors } from "../../styles/colors";

function Layout({ children }: PropsWithChildren) {
  return (
    <LayoutContainer>
      <Header>
        <Logo>alocados</Logo>
        <HeaderLeft>
          <Button
            buttonType="plain"
            color={colors.primaryFont}
            backgroundColor={colors.primary24}
          >
            환전하기
          </Button>
          <Button buttonType="text">거래내역</Button>
        </HeaderLeft>
      </Header>
      <Main>{children}</Main>
    </LayoutContainer>
  );
}

export default Layout;

const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Main = styled.main`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.div`
  font-weight: bold;
  font-size: 26px;
`;

const HeaderLeft = styled.div`
  display: flex;
`;
