import React from "react";
import Link from "next/link";
import BasicPageStyles from "../components/styles/BasicPageStyles";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import IndividualEvent from "../components/IndividualEvent";

const ALL_EVENTS_QUERY = gql`
  query ALL_EVENTS_QUERY {
    events {
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
`;

const Today = props => {
  return (
    <BasicPageStyles>
      <div className="container">
        <p>Text Messages Go Here</p>
        <Query query={ALL_EVENTS_QUERY}>
          {({ data, error, loading }) => {
            console.log(data);
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return data.events.map(event => (
              <IndividualEvent event={event} key={event.id} />
            ));
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
