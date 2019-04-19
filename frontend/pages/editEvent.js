import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import UpdateEvent from '../components/UpdateEvent'

const EditEvent = ({ query }) => {
    return (
        <BasicPageStyles>
            <div className="container">
                <UpdateEvent id={query.id} />
            </div>
        </BasicPageStyles>
    )
}

export default EditEvent
