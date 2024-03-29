import Nav from './Nav'
import Link from 'next/link'
import styled from 'styled-components'
import PenroseLogo from './svgs/PenroseLogo'
import Logo from './styles/Logo'
import Router from 'next/router'
import NProgress from 'nprogress'
import HamburgerMenu from './HamburgerMenu'
import HamburgerMenuStyles from './styles/HamburgerMenuStyles'

Router.onRouteChangeStart = () => {
    NProgress.start()
}
Router.onRouteChangeComplete = () => {
    NProgress.done()
}
Router.onRouteChangeError = () => {
    NProgress.done()
}

const StyledHeader = styled.header`
  background-image: linear-gradient(
    65deg,
    ${props => props.theme.primaryVariantDark},
    ${props => props.theme.primary}
  );
  .bar {
    /* border-bottom: 5px solid ${props => props.theme.black}; */
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    color: ${props => props.theme.onPrimary};
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 5px solid ${props => props.theme.background};
  }
  ul a {
    color: ${props => props.theme.onPrimary};
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
    color: ${props => props.theme.secondary};
  }

  .logoContainer {
    margin-left: 10px;
  }

  .postHeader {
    height: 20vh;
  }
`

const LogoStyles = styled.div``

const Header = () => {
    return (
        <StyledHeader>
            <HamburgerMenuStyles>
                <HamburgerMenu
                    isOpen={false}
                    pageWrapId={'main'}
                    outerContainerId={'innerContainer'}
                />
            </HamburgerMenuStyles>
            <div>
                <div className="bar" id="barrs">
                    <div className="topContainer">
                        <Logo>
                            <div className="logoContainer">
                                <PenroseLogo />
                                <div className="logoLabel">Close That Sale</div>
                            </div>
                        </Logo>
                    </div>
                    <Nav />
                </div>
            </div>
            <div className="postHeader" />
        </StyledHeader>
    )
}

export default Header
