import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import Reset from '../components/Reset'

const ResetPage = ({ query }) => {
    return (
        <BasicPageStyles>
            <div className="container">
                <Reset resetToken={query.resetToken} />
            </div>
        </BasicPageStyles>
    )
}

export default ResetPage
