import { PropsWithChildren } from "react";
import { Button } from "../Button";
import { styled } from "styled-components";
import { colors } from "../../styles/colors";
import { Link, useLocation } from "react-router-dom";
import { navRoutes } from "../../router/NavRouter";

function Layout({ children }: PropsWithChildren) {
  const location = useLocation();

  return (
    <LayoutContainer>
      <Header>
        <Logo>alocados</Logo>
        <HeaderLeft>
          {navRoutes.map((route) => (
            <Link key={route.path} to={route.path}>
              <Button
                buttonType={location.pathname === route.path ? "plain" : "text"}
                color={
                  location.pathname === route.path
                    ? colors.primaryFont
                    : undefined
                }
                backgroundColor={
                  location.pathname === route.path
                    ? colors.primary24
                    : undefined
                }
              >
                {route.title}
              </Button>
            </Link>
          ))}
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
