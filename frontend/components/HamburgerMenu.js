import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import HamburgerMenuStyles from './styles/HamburgerMenuStyles'

export default props => {
    console.log('[matt] props', props)
    // [matt]: This is mostly working but it's starting in an open state even though the menu is not open. It's reversed, but I want the overlay!
    return (
        // Pass on our props
        <HamburgerMenuStyles>
            <Menu {...props}>
                <a className="menu-item" href="/">
                    Home
                </a>

                <a className="menu-item" href="/burgers">
                    Burgers
                </a>

                <a className="menu-item" href="/pizzas">
                    Pizzas
                </a>

                <a className="menu-item" href="/desserts">
                    Desserts
                </a>
            </Menu>
        </HamburgerMenuStyles>
    )
}
