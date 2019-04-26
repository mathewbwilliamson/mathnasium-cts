import React, { Component } from 'react'
import Header from './Header'
import Meta from './Meta'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import theme from './styles/ThemeStyles'

const StyledPage = styled.div`
    background: ${props => props.theme.background};
    color: ${props => props.theme.onBackground};
`

const Inner = styled.div`
    max-width: ${props => props.theme.maxWidth};
    /* background-color: red; */
    margin: 0 auto;
    /* padding: 2rem; */
    width: 80vw;
    /* border: 2px solid ${props => props.theme.red}; */
    /* border-radius: 4px; */
    /* box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.13); */
    z-index: 2;
    position: relative;
    top: -130px;
`
// Font size is 10px for the basic size so rem math is easy. Default is 16.
injectGlobal`
  @import url(${props => props.theme.formUrl});

  html {
    box-sizing: border-box;
    font-size: 10px;
    background-color: #D9E6EF;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: ${props => props.theme.fontPrimary};
    background-color: ${props => props.theme.background};
  }

  h1, h2, h3, h4, h5 {
    font-family: ${props => props.theme.fontSecondary};
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.onPrimary};
  }

  button {  font-family: ${props => props.theme.fontPrimary}; }
`

class Page extends Component {
    state = {}
    render() {
        return (
            <ThemeProvider theme={theme}>
                <div id="main">
                    <StyledPage>
                        <Meta />
                        <Header />
                        <Inner id="innerContainer">{this.props.children}</Inner>
                    </StyledPage>
                </div>
            </ThemeProvider>
        )
    }
}

export default Page

// Notes for styled
// const MyButton = styled.button`
//     background-color: red;
//     font-size: ${props => (props.huge ? '100px' : '50px')};
// `

// <MyButton huge>
//                     Click Me
//                     <span>Here!</span>
//                 </MyButton>

//                 <MyButton>
//                     Click Me
//                     <span>Here!</span>
//                 </MyButton>
