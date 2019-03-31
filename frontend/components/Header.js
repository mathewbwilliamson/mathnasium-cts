import Nav from "./Nav";
import Link from "next/link";
import styled from "styled-components";
import PenroseLogo from "./svgs/PenroseLogo";
import Logo from "./styles/Logo";
import Router from "next/router";
import NProgress from "nprogress";
import { FiMenu } from "react-icons/fi";
import { IconContext } from "react-icons";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const StyledHeader = styled.header`
  .bar {
    /* border-bottom: 5px solid ${props => props.theme.black}; */
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    color: ${props => props.theme.lightgrey};
    background-color: ${props => props.theme.darkgrey};
    background-image: linear-gradient(
      65deg,
      ${props => props.theme.darkgreen},
      ${props => props.theme.maingreen}
    );
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 5px solid ${props => props.theme.lightgrey};
  }
  ul {
    background-image: linear-gradient(
      65deg,
      ${props => props.theme.darkgreen},
      ${props => props.theme.maingreen}
    );
  }
  ul a {
    color: ${props => props.theme.offwhite};
  }
  .topContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }
  .hamburgerMenuContainer {
    margin-right: 10px;
    color: ${props => props.theme.black};
  }
  .logoContainer {
    margin-left: 10px;
  }
  .postHeader {
    background-image: linear-gradient(
      65deg,
      ${props => props.theme.darkgreen},
      ${props => props.theme.maingreen}
    );
    height: 20vh;
  }
`;

const LogoStyles = styled.div``;

const Header = () => {
  return (
    <StyledHeader>
      <div>
        <div className="bar">
          <div className="topContainer">
            <Logo>
              <div className="logoContainer">
                <PenroseLogo />
                <div className="logoLabel">Close That Sale!</div>
              </div>
            </Logo>
            <IconContext.Provider
              value={{ size: "1.4em", className: "hamburgerMenu" }}
            >
              <div className="hamburgerMenuContainer">
                <FiMenu />
              </div>
            </IconContext.Provider>
          </div>
          <Nav />
        </div>
      </div>
      <div className="postHeader" />
    </StyledHeader>
  );
};

export default Header;
