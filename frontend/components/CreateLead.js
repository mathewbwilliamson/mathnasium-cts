import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import { isNamedType } from 'graphql'
import FormErrors from './FormErrors'
import Error from './ErrorMessage'
import Router from 'next/router'

const CREATE_LEAD_MUTATION = gql`
    mutation CREATE_LEAD_MUTATION(
        $firstName: String!
        $lastName: String
        $mobilePhoneNumber: String!
        $homePhoneNumber: String
        $emailAddress: String
        $notes: String
    ) {
        createLead(
            firstName: $firstName
            lastName: $lastName
            mobilePhoneNumber: $mobilePhoneNumber
            homePhoneNumber: $homePhoneNumber
            emailAddress: $emailAddress
            notes: $notes
        ) {
            id
        }
    }
`

class CreateLead extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            mobilePhoneNumber: '',
            homePhoneNumber: '',
            emailAddress: '',
            notes: '',
            formErrors: {
                firstName: '',
                lastName: '',
                mobilePhoneNumber: '',
                homePhoneNumber: '',
                emailAddress: '',
                notes: '',
            },
            emailAddressValid: false,
            mobilePhoneNumberValid: false,
            homePhoneNumberValid: false,
            formValid: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.validateField = this.validateField.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.errorClass = this.errorClass.bind(this)
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
                emailAddressValid = !!value.match(
                    /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                )
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
                homePhoneNumberValid = !!value.match(
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

    render() {
        return (
            <Mutation mutation={CREATE_LEAD_MUTATION} variables={this.state}>
                {(createLead, { loading, error }) => (
                    <Form
                        onSubmit={async e => {
                            // Stop the form from submitting
                            e.preventDefault()
                            //Send the data to the server
                            const res = await createLead()
                            console.log('[matt] res', res)
                            //TODO: Change them to the single lead page (right now, only all leads)
                            Router.push({
                                pathname: '/leadsList',
                                query: { id: res.data.createLead.id },
                            })
                        }}
                    >
                        <h2>Enter a Lead</h2>
                        <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="firstName">
                                First Name
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                    className={`${this.errorClass(
                                        this.state.formErrors.firstName
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
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                    className={`${this.errorClass(
                                        this.state.formErrors.lastName
                                    )}`}
                                />
                                <span className="validity" />
                            </label>
                            <label htmlFor="mobilePhoneNumber">
                                Mobile Phone Number
                                <input
                                    type="tel"
                                    id="mobilePhoneNumber"
                                    name="mobilePhoneNumber"
                                    placeholder="Mobile Phone Number"
                                    value={this.state.mobilePhoneNumber}
                                    onChange={this.handleChange}
                                    className={`${this.errorClass(
                                        this.state.formErrors.mobilePhoneNumber
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
                                    value={this.state.homePhoneNumber}
                                    onChange={this.handleChange}
                                    className={`${this.errorClass(
                                        this.state.formErrors.homePhoneNumber
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
                                    value={this.state.emailAddress}
                                    onChange={this.handleChange}
                                    className={`${this.errorClass(
                                        this.state.formErrors.emailAddress
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
                                    value={this.state.notes}
                                    onChange={this.handleChange}
                                    className={`${this.errorClass(
                                        this.state.formErrors.notes
                                    )}`}
                                />
                                <span className="validity" />
                            </label>
                        </fieldset>
                        <button type="submit" disabled={!this.state.formValid}>
                            Save Lead
                        </button>
                    </Form>
                )}
            </Mutation>
        )
    }
}

export default CreateLead
export { CREATE_LEAD_MUTATION }
