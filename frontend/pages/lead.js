import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import SingleLead from '../components/SingleLead'

const Lead = props => {
    console.log('[matt] props', props.query.id)

    return (
        <BasicPageStyles>
            <div className="container">
                <SingleLead id={props.query.id} />
            </div>
        </BasicPageStyles>
    )
}

export default Lead
