import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import { isNamedType } from "graphql";

// [matt]: TODO Need to create new Form styles

class CreateLead extends React.Component {
  render() {
    return (
      <Form>
        <h2>Enter a Lead</h2>
        <fieldset>
          <label htmlFor="firstName">
            First Name
            <input
              tupe="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              required
            />
          </label>
          <label htmlFor="lastName">
            Last Name
            <input
              tupe="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              required
            />
          </label>
        </fieldset>
      </Form>
    );
  }
}

export default CreateLead;
