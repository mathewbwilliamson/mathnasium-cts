import React from 'react'
import Link from 'next/link'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import IndividualLead from '../components/IndividualLead'
import PleaseSignIn from '../components/PleaseSignIn'

const ALL_LEADS_QUERY = gql`
    query ALL_LEADS_QUERY {
        leads {
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

const Today = props => {
    return (
        <BasicPageStyles>
            <PleaseSignIn>
                <div className="container">
                    <p>All Leads</p>
                    <Query query={ALL_LEADS_QUERY}>
                        {({ data, error, loading }) => {
                            console.log(data)
                            if (loading) return <p>Loading...</p>
                            if (error) return <p>Error: {error.message}</p>
                            return data.leads.map(lead => (
                                <IndividualLead lead={lead} key={lead.id} />
                            ))
                        }}
                    </Query>
                </div>
            </PleaseSignIn>
        </BasicPageStyles>
    )
}

export default Today
