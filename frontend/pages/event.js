import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import SingleEvent from '../components/SingleEvent'

const Event = props => {
    return (
        <BasicPageStyles>
            <div className="container">
                <SingleEvent id={props.query.id} />
            </div>
        </BasicPageStyles>
    )
}

export default Event
