import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import SingleEvent from '../components/SingleEvent'
import PleaseSignIn from '../components/PleaseSignIn'

const Event = props => {
    return (
        <BasicPageStyles>
            <PleaseSignIn>
                <div className="container">
                    <SingleEvent id={props.query.id} />
                </div>
            </PleaseSignIn>
        </BasicPageStyles>
    )
}

export default Event
