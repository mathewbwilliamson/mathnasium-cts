import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import CreateEvent from '../components/CreateEvent'

const NewEvent = props => {
    return (
        <BasicPageStyles>
            <div className="container">
                <CreateEvent />
            </div>
        </BasicPageStyles>
    )
}

export default NewEvent
