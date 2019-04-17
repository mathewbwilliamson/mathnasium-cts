import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import IndividualEvent from '../components/IndividualEvent'

const TEXT_EVENTS_QUERY = gql`
    query TEXT_EVENTS_QUERY {
        events(where: { type_contains: "text" }) {
            id
            type
            dueDate
            dueTime
            notes
            message
            messageTitle
            messageShortened
            sentDate
            sentTime
        }
    }
`
const CALL_EVENTS_QUERY = gql`
    query CALL_EVENTS_QUERY {
        events(where: { type_contains: "call" }) {
            id
            type
            dueDate
            dueTime
            notes
            message
            messageTitle
            messageShortened
            sentDate
            sentTime
        }
    }
`
const EMAIL_EVENTS_QUERY = gql`
    query EMAIL_EVENTS_QUERY {
        events(where: { type_contains: "email" }) {
            id
            type
            dueDate
            dueTime
            notes
            message
            messageTitle
            messageShortened
            sentDate
            sentTime
        }
    }
`

const Today = props => {
    return (
        <BasicPageStyles>
            <div className="container">
                <h2>Text Messages Scheduled to Go Out Today</h2>
                <Query query={TEXT_EVENTS_QUERY}>
                    {({ data, error, loading }) => {
                        console.log(data)
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error: {error.message}</p>
                        return data.events.map(event => (
                            <IndividualEvent event={event} key={event.id} />
                        ))
                    }}
                </Query>
            </div>
            <div className="container">
                <h2>Calls Scheduled to Be Done Today</h2>
                <Query query={CALL_EVENTS_QUERY}>
                    {({ data, error, loading }) => {
                        console.log(data)
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error: {error.message}</p>
                        return data.events.map(event => (
                            <IndividualEvent event={event} key={event.id} />
                        ))
                    }}
                </Query>
            </div>
            <div className="container">
                <h2>Email Messages Scheduled to Go Out Today</h2>
                <Query query={EMAIL_EVENTS_QUERY}>
                    {({ data, error, loading }) => {
                        console.log(data)
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error: {error.message}</p>
                        return data.events.map(event => (
                            <IndividualEvent event={event} key={event.id} />
                        ))
                    }}
                </Query>
            </div>
        </BasicPageStyles>
    )
}

export default Today
