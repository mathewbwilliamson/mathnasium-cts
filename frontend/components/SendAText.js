import React, { Component } from 'react'
import axios from 'axios'
import Link from 'next/link'
import User from './User'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import PleaseSignIn from '../components/PleaseSignIn'
import Form from './styles/Form'
import Error from './ErrorMessage'

// [matt]: For styling the menu, just put it on the top left before the logo so that it would be top left hamburger, Logo/Name, then below that is the links

class SendAText extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            toPhoneNumber: '',
            fromPhoneNumber: '',
        }
        this.saveToState = this.saveToState.bind(this)
    }

    saveToState(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
        return null
    }

    render() {
        return (
            <PleaseSignIn>
                <BasicPageStyles>
                    <div className="container">
                        <Form
                            method="POST"
                            onSubmit={async e => {
                                e.preventDefault()
                                await axios
                                    .post('http://localhost:4444/sendsms', {
                                        message: this.state.message,
                                        toPhoneNumber: this.state.toPhoneNumber,
                                    })
                                    .then(response => {
                                        console.log(
                                            'this is the console',
                                            response
                                        )
                                    })
                                    .catch(err => {
                                        this.setState({
                                            error: 'Error with form',
                                        })
                                        console.log(err)
                                    })
                            }}
                        >
                            <fieldset>
                                <h2>Send a Text</h2>
                                <Error error={{ message: this.state.error }} />
                                <label htmlFor="message">
                                    Message
                                    <input
                                        type="text"
                                        name="message"
                                        placeholder="message"
                                        value={this.state.message}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <label htmlFor="toPhoneNumber">
                                    To Phone Number
                                    <input
                                        type="text"
                                        name="toPhoneNumber"
                                        placeholder="toPhoneNumber"
                                        value={this.state.toPhoneNumber}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <button type="submit">Send the Text</button>
                            </fieldset>
                        </Form>
                    </div>
                </BasicPageStyles>
            </PleaseSignIn>
        )
    }
}

export default SendAText
