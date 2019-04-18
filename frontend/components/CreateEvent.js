import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import { isNamedType } from 'graphql'
import FormErrors from './FormErrors'
import Error from './ErrorMessage'
import Router from 'next/router'

const CREATE_EVENT_MUTATION = gql`
    mutation CREATE_EVENT_MUTATION(
        $type: String!
        $dueDate: DateTime
        $dueTime: DateTime
        $notes: String
        $message: String
        $messageTitle: String
        $messageShortened: String
    ) {
        createEvent(
            type: $type
            dueDate: $dueDate
            dueTime: $dueTime
            notes: $notes
            message: $message
            messageTitle: $messageTitle
            messageShortened: $messageShortened
        ) {
            id
        }
    }
`

class CreateEvent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            type: '',
            dueDate: '',
            dueTime: '',
            notes: '',
            message: '',
            messageTitle: '',
            messageShortened: '',
            formErrors: {
                type: '',
                dueDate: '',
                dueTime: '',
                notes: '',
                message: '',
                messageTitle: '',
                messageShortened: '',
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
            <div>This needs to be fixed</div>
            // <Mutation mutation={CREATE_EVENT_MUTATION} variables={this.state}>
            //     {(createLead, { loading, error }) => (
            //         <Form
            //             onSubmit={async e => {
            //                 // Stop the form from submitting
            //                 e.preventDefault()
            //                 //Send the data to the server
            //                 const res = await createLead()
            //                 console.log('[matt] res', res)
            //                 Router.push({
            //                     pathname: '/event',
            //                     query: { id: res.data.createEvent.id },
            //                 })
            //             }}
            //         >
            //             <h2>Enter an Event</h2>
            //             <Error error={error} />
            //             <fieldset disabled={loading} aria-busy={loading}>
            //                 {/* // [matt]: Make into a dropdown for Text, Call, Email */}
            //                 <label htmlFor="type">
            //                     Type
            //                     <input
            //                         type="text"
            //                         id="type"
            //                         name="type"
            //                         placeholder="Type"
            //                         value={this.state.type}
            //                         onChange={this.handleChange}
            //                         className={`${this.errorClass(
            //                             this.state.formErrors.type
            //                         )}`}
            //                         required
            //                     />
            //                     <span className="validity" />
            //                 </label>
            //                 {/* // [matt]: Make into a date picker */}
            //                 <label htmlFor="dueDate">
            //                     Due Date
            //                     <input
            //                         type="text"
            //                         id="dueDate"
            //                         name="dueDate"
            //                         placeholder="Due Date"
            //                         value={this.state.dueDate}
            //                         onChange={this.handleChange}
            //                         className={`${this.errorClass(
            //                             this.state.formErrors.dueDate
            //                         )}`}
            //                     />
            //                     <span className="validity" />
            //                 </label>
            //                 {/* // [matt]: Make into a date picker */}
            //                 <label htmlFor="dueTime">
            //                     Due Time
            //                     <input
            //                         type="tel"
            //                         id="dueTime"
            //                         name="dueTime"
            //                         placeholder="Due Time"
            //                         value={this.state.dueTime}
            //                         onChange={this.handleChange}
            //                         className={`${this.errorClass(
            //                             this.state.formErrors.dueTime
            //                         )}`}
            //                         required
            //                     />
            //                     <span className="validity" />
            //                 </label>
            //                 <label htmlFor="notes">
            //                     Notes
            //                     <textarea
            //                         id="notes"
            //                         name="notes"
            //                         placeholder="Notes"
            //                         value={this.state.notes}
            //                         onChange={this.handleChange}
            //                         className={`${this.errorClass(
            //                             this.state.formErrors.notes
            //                         )}`}
            //                     />
            //                     <span className="validity" />
            //                 </label>
            //                 <label htmlFor="messsage">
            //                     Message
            //                     <input
            //                         type="text"
            //                         id="messsage"
            //                         name="messsage"
            //                         placeholder="Message"
            //                         value={this.state.messsage}
            //                         onChange={this.handleChange}
            //                         className={`${this.errorClass(
            //                             this.state.formErrors.messsage
            //                         )}`}
            //                     />
            //                     <span className="validity" />
            //                 </label>
            //                 <label htmlFor="messsageTitle">
            //                     Message Title
            //                     <input
            //                         type="text"
            //                         id="messsageTitle"
            //                         name="messsageTitle"
            //                         placeholder="Message Title"
            //                         value={this.state.messsageTitle}
            //                         onChange={this.handleChange}
            //                         className={`${this.errorClass(
            //                             this.state.formErrors.messsageTitle
            //                         )}`}
            //                     />
            //                     <span className="validity" />
            //                 </label>
            //                 <label htmlFor="messsageShortened">
            //                     Message Shortened
            //                     <input
            //                         type="text"
            //                         id="messsageShortened"
            //                         name="messsageShortened"
            //                         placeholder="Message Shortened"
            //                         value={this.state.messsageShortened}
            //                         onChange={this.handleChange}
            //                         className={`${this.errorClass(
            //                             this.state.formErrors.messsageShortened
            //                         )}`}
            //                     />
            //                     <span className="validity" />
            //                 </label>
            //             </fieldset>
            //             <button type="submit" disabled={!this.state.formValid}>
            //                 Save Lead
            //             </button>
            //         </Form>
            //     )}
            // </Mutation>
        )
    }
}

export default CreateEvent
export { CREATE_LEAD_MUTATION }
