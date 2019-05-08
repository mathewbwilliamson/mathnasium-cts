import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import SingleLead from '../components/SingleLead'
import PleaseSignIn from '../components/PleaseSignIn'

const Lead = props => {
    return (
        <BasicPageStyles>
            <PleaseSignIn>
                <div className="container">
                    <SingleLead id={props.query.id} />
                </div>
            </PleaseSignIn>
        </BasicPageStyles>
    )
}

export default Lead
