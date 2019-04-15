import React, { Component } from 'react'
import Header from './Header'
import Meta from './Meta'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'

const theme = {
    //theme is an object that contains all the variables for the entire project
    red: '#FF0000',
    black: '#393939',
    maingreen: '#75CA46',
    lightgreen: '#ACDBCE',
    brightgreen: '#67C352',
    darkgreen: '#31AE72',
    grey: '#3A3A3A',
    lightgrey: '#F1F1F1',
    highlightgrey: '#E5E5E5',
    purple: '#806DCB',
    darkgrey: '#363F41',
    offwhite: '#FFFFFF',
    white: '#FFFFFF',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
}

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  /* background-color: white; */
  margin: 0 auto;
  /* padding: 2rem; */
  width: 80vw;
  /* border: 2px solid ${props => props.theme.lightgrey}; */
  /* border-radius: 4px; */
  /* box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.13); */
  z-index: 2;
  position: relative;
  top: -130px;
`
// Font size is 10px for the basic size so rem math is easy. Default is 16.
injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'radnika_next'; }
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
                        <Inner>{this.props.children}</Inner>
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
