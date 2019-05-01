import React, { Component } from 'react'
import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'

// [matt]: For styling the menu, just put it on the top left before the logo so that it would be top left hamburger, Logo/Name, then below that is the links

const Nav = () => {
    return (
        <User>
            {({ data: { me } }) => (
                <NavStyles>
                    {me && (
                        <React.Fragment>
                            <Link href="/today">
                                <a>Today</a>
                            </Link>
                            <Link href="/newLead">
                                <a>New Lead</a>
                            </Link>
                            <Link href="/future">
                                <a>Future</a>
                            </Link>
                        </React.Fragment>
                    )}
                    {!me && (
                        <Link href="/signup">
                            <a>Welcome! Please Sign In (or Sign Up)</a>
                        </Link>
                    )}
                </NavStyles>
            )}
        </User>
    )
}

export default Nav
