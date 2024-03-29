import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import { isNamedType } from 'graphql'
import FormErrors from './FormErrors'
import Error from './ErrorMessage'
import Router from 'next/router'

const UPDATE_EVENT_MUTATION = gql`
    mutation UPDATE_EVENT_MUTATION(
        $id: ID!
        $type: String
        $dueDate: DateTime
        $dueTime: DateTime
        $notes: String
        $message: String
        $messageTitle: String
        $messageShortened: String
    ) {
        updateEvent(
            type: $type
            dueDate: $dueDate
            dueTime: $dueTime
            notes: $notes
            message: $message
            messageTitle: $messageTitle
            messageShortened: $messageShortened
        ) {
            type
            dueDate
            dueTime
            notes
            message
            messageTitle
            messageShortened
        }
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
        }
    }
`

class UpdateEvent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // type: '',
            // dueDate: '',
            // dueTime: '',
            // notes: '',
            // message: '',
            // messageTitle: '',
            // messageShortened: '',
            formErrors: {
                type: '',
                dueDate: '',
                dueTime: '',
                notes: '',
                message: '',
                messageTitle: '',
                messageShortened: '',
            },
            emailAddressValid: true,
            mobilePhoneNumberValid: false,
            homePhoneNumberValid: true,
            formValid: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.validateField = this.validateField.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.errorClass = this.errorClass.bind(this)
        this.updateLead = this.updateLead.bind(this)
    }

    validateForm() {
        this.setState({
            formValid:
                this.state.emailAddressValid &&
                this.state.mobilePhoneNumberValid &&
                this.state.homePhoneNumberValid,
        })
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors
        let emailAddressValid = this.state.emailAddressValid
        let mobilePhoneNumberValid = this.state.mobilePhoneNumberValid
        let homePhoneNumberValid = this.state.homePhoneNumberValid

        switch (fieldName) {
            case 'emailAddress':
                console.log('[matt] value', value)

                emailAddressValid =
                    value &&
                    !!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                fieldValidationErrors.emailAddress = emailAddressValid
                    ? ''
                    : ' is invalid'
                break
            case 'mobilePhoneNumber':
                mobilePhoneNumberValid = !!value.match(
                    /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/im
                )
                fieldValidationErrors.mobilePhoneNumber = mobilePhoneNumberValid
                    ? ''
                    : ' is invalid'
                break
            case 'homePhoneNumber':
                homePhoneNumberValid =
                    value &&
                    !!value.match(
                        /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/im
                    )
                fieldValidationErrors.homePhoneNumber = homePhoneNumberValid
                    ? ''
                    : ' is invalid'
                break
            default:
                break
        }

        this.setState(
            {
                formErrors: fieldValidationErrors,
                emailAddressValid: emailAddressValid,
                mobilePhoneNumberValid: mobilePhoneNumberValid,
                homePhoneNumberValid: homePhoneNumberValid,
            },
            this.validateForm
        )
    }

    handleChange(e) {
        const { name, type, value } = e.target
        const val = type === 'number' ? parseFloat(value) : value

        this.setState(
            {
                [name]: val,
            },
            () => {
                this.validateField(name, value)
            }
        )
    }

    errorClass(error) {
        return error.length === 0 ? 'no-error' : 'has-error'
    }

    async updateLead(e, updateItemMutation) {
        e.preventDefault()
        console.log('[matt] Updating Item!')
        const variables = {
            id: this.props.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            mobilePhoneNumber: this.state.mobilePhoneNumber,
            homePhoneNumber: this.state.homePhoneNumber,
            emailAddress: this.state.emailAddress,
            notes: this.state.notes,
        }
        console.log(variables)
        const res = await updateItemMutation({
            variables,
        })

        console.log('[matt] UPDATED! ')
    }

    render() {
        return (
            <Query
                query={SINGLE_EVENT_QUERY}
                variables={{
                    id: this.props.id,
                }}
            >
                {({ data, loading }) => {
                    if (loading) return <p>Loading...</p>
                    if (!data.lead)
                        return <p>No Lead found for ID {this.props.id}</p>
                    return (
                        <Mutation
                            mutation={UPDATE_EVENT_MUTATION}
                            variables={this.state}
                        >
                            {(updateLead, { loading, error }) => (
                                <Form
                                    onSubmit={e =>
                                        this.updateLead(e, updateLead)
                                    }
                                >
                                    <h2>Edit a Lead</h2>
                                    <Error error={error} />
                                    <fieldset
                                        disabled={loading}
                                        aria-busy={loading}
                                    >
                                        <label htmlFor="firstName">
                                            <div>
                                                First Name
                                                <span className="required">
                                                    (Required)
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                placeholder="First Name"
                                                defaultValue={
                                                    data.lead.firstName
                                                }
                                                onChange={this.handleChange}
                                                className={`${this.errorClass(
                                                    this.state.formErrors
                                                        .firstName
                                                )}`}
                                                required
                                            />
                                            <span className="validity" />
                                        </label>
                                        <label htmlFor="lastName">
                                            Last Name
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Last Name"
                                                defaultValue={
                                                    data.lead.lastName
                                                }
                                                onChange={this.handleChange}
                                                className={`${this.errorClass(
                                                    this.state.formErrors
                                                        .lastName
                                                )}`}
                                            />
                                            <span className="validity" />
                                        </label>
                                        <label htmlFor="mobilePhoneNumber">
                                            <div>
                                                Mobile Phone Number
                                                <span className="required">
                                                    (Required)
                                                </span>
                                            </div>
                                            <input
                                                type="tel"
                                                id="mobilePhoneNumber"
                                                name="mobilePhoneNumber"
                                                placeholder="Mobile Phone Number"
                                                defaultValue={
                                                    data.lead.mobilePhoneNumber
                                                }
                                                onChange={this.handleChange}
                                                className={`${this.errorClass(
                                                    this.state.formErrors
                                                        .mobilePhoneNumber
                                                )}`}
                                                required
                                            />
                                            <span className="validity" />
                                        </label>
                                        <label htmlFor="homePhoneNumber">
                                            Home Phone Number
                                            <input
                                                type="tel"
                                                id="homePhoneNumber"
                                                name="homePhoneNumber"
                                                placeholder="Home Phone Number"
                                                defaultValue={
                                                    data.lead.homePhoneNumber
                                                }
                                                onChange={this.handleChange}
                                                className={`${this.errorClass(
                                                    this.state.formErrors
                                                        .homePhoneNumber
                                                )}`}
                                            />
                                            <span className="validity" />
                                        </label>
                                        <label htmlFor="emailAddress">
                                            Email Address
                                            <input
                                                type="text"
                                                id="emailAddress"
                                                name="emailAddress"
                                                placeholder="Email Address"
                                                defaultValue={
                                                    data.lead.emailAddress
                                                }
                                                onChange={this.handleChange}
                                                className={`${this.errorClass(
                                                    this.state.formErrors
                                                        .emailAddress
                                                )}`}
                                            />
                                            <span className="validity" />
                                        </label>
                                        <label htmlFor="notes">
                                            Notes
                                            <textarea
                                                id="notes"
                                                name="notes"
                                                placeholder="Notes"
                                                defaultValue={data.lead.notes}
                                                onChange={this.handleChange}
                                                className={`${this.errorClass(
                                                    this.state.formErrors.notes
                                                )}`}
                                            />
                                            <span className="validity" />
                                        </label>
                                    </fieldset>
                                    <button
                                        type="submit"
                                        disabled={!this.state.formValid}
                                    >
                                        Save Changes
                                    </button>
                                </Form>
                            )}
                        </Mutation>
                    )
                }}
            </Query>
        )
    }
}

export default UpdateEvent
export { UPDATE_EVENT_MUTATION }
