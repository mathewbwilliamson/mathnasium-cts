import React from "react";
import Link from "next/link";
import BasicPageStyles from "../components/styles/BasicPageStyles";
import CreateLead from "../components/CreateLead";

const NewLead = props => {
  return (
    <BasicPageStyles>
      <div className="container">
        <p>NewLead!!!</p>
        <CreateLead />
      </div>
    </BasicPageStyles>
  );
};

export default NewLead;
