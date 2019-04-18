import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import UpdateLead from '../components/UpdateLead'

const EditLead = ({ query }) => {
    return (
        <BasicPageStyles>
            <div className="container">
                <UpdateLead id={query.id} />
            </div>
        </BasicPageStyles>
    )
}

export default EditLead
