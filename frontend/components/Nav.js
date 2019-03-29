import React, { Component } from "react";
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import Logo from "./styles/Logo";

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
    </NavStyles>
  );
};

export default Nav;
