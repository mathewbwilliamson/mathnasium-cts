import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import UpdateLead from '../components/UpdateLead'
import PleaseSignIn from '../components/PleaseSignIn'

const EditLead = ({ query }) => {
    return (
        <BasicPageStyles>
            <PleaseSignIn>
                <div className="container">
                    <UpdateLead id={query.id} />
                </div>
            </PleaseSignIn>
        </BasicPageStyles>
    )
}

export default EditLead
