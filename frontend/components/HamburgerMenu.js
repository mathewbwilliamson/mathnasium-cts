import React from 'react'
import Link from 'next/link'
import { slide as Menu } from 'react-burger-menu'
import HamburgerMenuStyles from './styles/HamburgerMenuStyles'

class HamburgerMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false,
        }
        this.closeMenu = this.closeMenu.bind(this)
    }

    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen })
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu() {
        this.setState({ menuOpen: false })
    }

    // This can be used to toggle the menu, e.g. when using a custom icon
    // Tip: You probably want to hide either/both default icons if using a custom icon
    // See https://github.com/negomi/react-burger-menu#custom-icons
    toggleMenu() {
        this.setState({ menuOpen: !this.state.menuOpen })
    }

    render() {
        return (
            <HamburgerMenuStyles>
                <Menu
                    {...this.props}
                    isOpen={this.state.menuOpen}
                    onStateChange={state => this.handleStateChange(state)}
                >
                    <Link href="/">
                        <a onClick={this.closeMenu} className="menu-item">
                            Home
                        </a>
                    </Link>
                    <Link href="/today">
                        <a onClick={this.closeMenu} className="menu-item">
                            Today
                        </a>
                    </Link>
                    <Link href="/newLead">
                        <a onClick={this.closeMenu} className="menu-item">
                            New Lead
                        </a>
                    </Link>
                    <Link href="/future">
                        <a onClick={this.closeMenu} className="menu-item">
                            Future
                        </a>
                    </Link>
                    <Link href="/leadsList">
                        <a onClick={this.closeMenu} className="menu-item">
                            Leads List
                        </a>
                    </Link>
                    <Link href="/newEvent">
                        <a onClick={this.closeMenu} className="menu-item">
                            New Event
                        </a>
                    </Link>
                    <Link href="/signup">
                        <a onClick={this.closeMenu} className="menu-item">
                            Signup
                        </a>
                    </Link>
                </Menu>
            </HamburgerMenuStyles>
        )
    }
}

export default HamburgerMenu
