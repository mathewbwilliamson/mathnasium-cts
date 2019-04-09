import React from "react";
import Link from "next/link";
import BasicPageStyles from "../components/styles/BasicPageStyles";
import { Query } from "react-apollo";
import gql from "graphql-tag";

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
`;

const Today = props => {
  return (
    <BasicPageStyles>
      <div className="container">
        <p>Text Messages Go Here</p>
        <Query query={ALL_LEADS_QUERY}>
          {({ data, error, loading }) => {
            console.log(payload);
            return <p>I'm the query child</p>;
          }}
        </Query>
      </div>
      <div className="container">
        <p>Emails Go Here!</p>
      </div>
      <div className="container">
        <p>Calls Go Here@</p>
      </div>
      <div className="container">
        <p>This is the TODAY PAGE!!!</p>
      </div>
      <div className="container">
        <p>This is the TODAY PAGE!!!</p>
      </div>
      <div className="container">
        <p>This is the TODAY PAGE!!!</p>
      </div>
    </BasicPageStyles>
  );
};

export default Today;
