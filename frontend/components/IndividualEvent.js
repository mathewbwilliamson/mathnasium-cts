import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import { defaultDataIdFromObject } from "apollo-boost";
import BasicPageStyles from "../components/styles/BasicPageStyles";

const IndividualEvent = props => {
  const {
    type,
    dueDate,
    dueTime,
    notes,
    message,
    messageTitle,
    messageShortened,
    sentDate,
    sentTime
  } = props.event;
  console.log("[matt] props", props);

  return (
    <BasicPageStyles>
      <div className="container">
        <p>Type: {type}</p>
        <p>dueDate: {dueDate}</p>
        <p>dueTime: {dueTime}</p>
        <p>notes: {notes}</p>
        <p>Message: {message}</p>
        <p>messageTitle: {messageTitle}</p>
        <p>messageShortened: {messageShortened}</p>
        <p>sentDate: {sentDate}</p>
        <p>sentTime: {sentTime}</p>
      </div>
    </BasicPageStyles>
  );
};

export default IndividualEvent;
