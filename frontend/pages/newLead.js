import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import CreateLead from '../components/CreateLead'
import PleaseSignIn from '../components/PleaseSignIn'

const NewLead = props => {
    return (
        <BasicPageStyles>
            <PleaseSignIn>
                <div className="container">
                    <CreateLead />
                </div>
            </PleaseSignIn>
        </BasicPageStyles>
    )
}

export default NewLead
