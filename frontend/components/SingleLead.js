import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Error from './ErrorMessage'
import styled from 'styled-components'
import Head from 'next/head'
import IndividualLead from './IndividualLead'

// [matt]: TODO not sure if these work??
const SingleItemStyles = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
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

const SINGLE_LEAD_QUERY = gql`
    query SINGLE_LEAD_QUERY($id: ID!) {
        lead(where: { id: $id }) {
            id
            firstName
            lastName
            mobilePhoneNumber
            homePhoneNumber
            emailAddress
            notes
        }
    }
`

class SingleLead extends Component {
    render() {
        return (
            <Query
                query={SINGLE_LEAD_QUERY}
                variables={{
                    id: this.props.id,
                }}
            >
                {({ error, loading, data }) => {
                    if (error) return <Error error={error} />
                    if (loading) return <p>Loading...</p>
                    if (!data.lead)
                        return <p>No lead found for {this.props.id}</p>
                    console.log('[matt] data', data)
                    const lead = data.lead
                    return (
                        <SingleItemStyles>
                            <Head>
                                <title>
                                    Close That Sale! | {lead.firstName}
                                </title>
                            </Head>
                            <div className="details">
                                <IndividualLead lead={lead} />
                            </div>
                        </SingleItemStyles>
                    )
                }}
            </Query>
        )
    }
}

export default SingleLead
