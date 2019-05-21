import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import SendAText from '../components/SendAText'

const SendATextPage = ({ query }) => {
    return (
        <BasicPageStyles>
            <div className="container">
                <SendAText />
            </div>
        </BasicPageStyles>
    )
}

export default SendATextPage
