import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import CreateEvent from '../components/CreateEvent'
import PleaseSignIn from '../components/PleaseSignIn'

const NewEvent = props => {
    return (
        <BasicPageStyles>
            <PleaseSignIn>
                <div className="container">
                    <CreateEvent />
                </div>
            </PleaseSignIn>
        </BasicPageStyles>
    )
}

export default NewEvent
