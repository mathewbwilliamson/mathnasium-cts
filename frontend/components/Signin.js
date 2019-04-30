import React from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            email
            name
        }
    }
`

class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            name: '',
            password: '',
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
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
                // [matt]: refetch says that when this mutation runs, we should also refetch the Current User and run that query.
                // [matt]: This should update user on the page.
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(signup, { error, loading }) => {
                    return (
                        <Form
                            method="POST"
                            onSubmit={async e => {
                                e.preventDefault()
                                const res = await signup()
                                // [matt]: Add validation on this form like we have on the other forms
                                // [matt]: TODO Add a better error message if the email is the same as another email in the DB already. It's response is cryptic.
                                console.log('[matt] res', res)
                                this.setState({
                                    name: '',
                                    email: '',
                                    password: '',
                                })
                            }}
                        >
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign in to your account</h2>
                                <Error error={error} />
                                <label htmlFor="email">
                                    Email
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        value={this.state.email}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <label htmlFor="password">
                                    Password
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        value={this.state.password}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <button type="submit">Sign In</button>
                            </fieldset>
                        </Form>
                    )
                }}
            </Mutation>
        )
    }
}

export default Signin
