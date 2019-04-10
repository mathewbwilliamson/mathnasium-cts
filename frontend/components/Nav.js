import React, { Component } from "react";
import Link from "next/link";
import NavStyles from "./styles/NavStyles";

// [matt]: For styling the menu, just put it on the top left before the logo so that it would be top left hamburger, Logo/Name, then below that is the links

const Nav = () => {
  return (
    <NavStyles>
      <Link href="/today">
        <a>Today</a>
      </Link>
      <Link href="/newLead">
        <a>New Lead</a>
      </Link>
      <Link href="/future">
        <a>Future</a>
      </Link>
      {/* TODO: Remove this later */}
      <Link href="/leadsList">
        <a>Leads List</a>
      </Link>
    </NavStyles>
  );
};

export default Nav;
