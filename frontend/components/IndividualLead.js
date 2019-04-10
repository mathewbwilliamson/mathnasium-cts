import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import { defaultDataIdFromObject } from "apollo-boost";
import BasicPageStyles from "../components/styles/BasicPageStyles";

const IndividualLead = props => {
  const {
    firstName,
    lastName,
    emailAddress,
    mobilePhoneNumber,
    notes,
    homePhoneNumber
  } = props.lead;
  console.log("[matt] props", props);

  return (
    <BasicPageStyles>
      <div className="container">
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Mobile Phone: {mobilePhoneNumber}</p>
        <p>Home Phone: {homePhoneNumber}</p>
        <p>Email Address: {emailAddress}</p>
        <p>Notes: {notes}</p>
      </div>
    </BasicPageStyles>
  );
};

export default IndividualLead;
