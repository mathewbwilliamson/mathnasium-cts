import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Error from './ErrorMessage'
import styled from 'styled-components'
import Head from 'next/head'
import IndividualEvent from './IndividualEvent'

// [matt]: TODO not sure if these work??
const SingleItemStyles = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${props => props.theme.boxShadow};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .details {
        margin: 3rem;
        font-size: 2rem;
    }
`

const SINGLE_EVENT_QUERY = gql`
    query SINGLE_EVENT_QUERY($id: ID!) {
        event(where: { id: $id }) {
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

class SingleEvent extends Component {
    render() {
        return (
            <Query
                query={SINGLE_EVENT_QUERY}
                variables={{
                    id: this.props.id,
                }}
            >
                {({ error, loading, data }) => {
                    if (error) return <Error error={error} />
                    if (loading) return <p>Loading...</p>
                    if (!data.event)
                        return <p>No event found for {this.props.id}</p>
                    console.log('[matt] data', data)
                    const event = data.event
                    return (
                        // <SingleItemStyles>
                        <div>
                            <Head>
                                <title>
                                    Close That Sale! | {event.message}
                                </title>
                            </Head>
                            <div className="details">
                                <IndividualEvent event={event} />
                            </div>
                        </div>
                        // </SingleItemStyles>
                    )
                }}
            </Query>
        )
    }
}

export default SingleEvent
