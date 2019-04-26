import styled from 'styled-components'

// Using it: ${props => props.theme.primary}

const theme = {
    //theme is an object that contains all the variables for the entire project
    fontUrl: 'https://fonts.googleapis.com/css?family=Lato|Roboto',
    fontPrimary: 'Roboto',
    fontSecondary: 'Lato',

    primary: '#4E9CEB',
    primaryVariantLight: '#78BAF1',
    primaryVariantDark: '#396BB8',
    secondary: '#B92FFF',
    secondaryVariantLight: '#D48FFF',
    secondaryVariantDark: '#8C00F7',
    background: '#D9E6EF',
    surface: '#FFFFFF',
    surfaceVariant: '#EFF1F4',
    error: '#B00020',
    onPrimary: '#ffffff',
    onSecondary: '#393939',
    onBackground: '#393939',
    onSurface: '#393939',
    onError: '#FFFFFF',

    maxWidth: '1000px',
    boxShadow: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
}

export default theme
