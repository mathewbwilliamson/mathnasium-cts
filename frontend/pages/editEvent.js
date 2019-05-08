import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import UpdateEvent from '../components/UpdateEvent'
import PleaseSignIn from '../components/PleaseSignIn'

const EditEvent = ({ query }) => {
    return (
        <BasicPageStyles>
            <PleaseSignIn>
                <div className="container">
                    <UpdateEvent id={query.id} />
                </div>
            </PleaseSignIn>
        </BasicPageStyles>
    )
}

export default EditEvent
