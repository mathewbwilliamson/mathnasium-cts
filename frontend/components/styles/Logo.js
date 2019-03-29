import styled from "styled-components";

const Logo = styled.div`
  /* .logoIcon {
    content: "";
    width: 40px;
    height: 35px;
    margin-left: 5px;
    margin-right: 35px;
    margin-top: 18px;
    margin-bottom: 24px;
    position: relative;
    background: ${props => props.theme.offWhite};
    border-radius: 10px;
    box-shadow: 0 0 0 9px #28a9e1, 0 7px 0 9px #115a91;
    left: 23px;
  }

  .logoIcon:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 47%;
    width: 50%;
    height: 50%;
    margin: -22% 0 0 -25%;
    background: inherit;
    box-shadow: 0 0 0 4px ${props => props.theme.darkgrey};
  } */
  /* .logoIcon:after {
    content: "";
    background: inherit;
    width: 17%;
    height: 100%;
    left: 41%;
    position: absolute;
  } */

  .logoLabel {
    text-transform: uppercase;
    transform: skew(-12deg);
    padding-bottom: 20px;
  }

  .logoContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .isvg.loaded {
    margin-right: -258px;
  }
`;

export default Logo;
