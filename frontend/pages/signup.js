import Router from 'next/router'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import RequestReset from '../components/RequestReset'

import styled from 'styled-components'

const Columns = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
`

const SignupPage = props => {
    // [matt]: When we arrive at this page and we are already logged in, redirect to another page?
    // Router.replace('/')
    return (
        <BasicPageStyles>
            <Columns className="container">
                <Signup />
                <Signin />
                <RequestReset />
            </Columns>
        </BasicPageStyles>
    )
}

export default SignupPage
