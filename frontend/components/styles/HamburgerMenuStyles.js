import styled from 'styled-components'

const HamburgerMenuStyles = styled.div`
    /* Individual item */
    a {
        display: block;
        /* Our sidebar item styling */
        text-decoration: none;
        margin-bottom: 10px;
        color: ${props => props.theme.offwhite};
        transition: color 0.2s;
    }

    /* Change color on hover */
    a:hover {
        color: ${props => props.theme.purple};
        transition: color 0.2s;
    }

    /* The rest copied directly from react-burger-menu docs */

    /* Position and sizing of burger button */
    .bm-burger-button {
        position: fixed;
        width: 36px;
        height: 30px;
        right: 12px;
        top: 14px;
    }

    /* Color/shape of burger icon bars */
    .bm-burger-bars {
        background: #373a47;
    }

    /* Position and sizing of clickable cross button */
    .bm-cross-button {
        height: 24px;
        width: 24px;
    }

    /* Color/shape of close button cross */
    .bm-cross {
        background: #bdc3c7;
    }

    /* General sidebar styles */
    .bm-menu {
        background: #373a47;
        padding: 2.5em 1.5em 0;
        font-size: 1.15em;
    }

    /* Morph shape necessary with bubble or elastic */
    .bm-morph-shape {
        fill: #373a47;
    }

    /* Wrapper for item list */
    .bm-item-list {
        color: #b8b7ad;
    }

    /* Styling of overlay */
    .bm-overlay {
        background: rgba(0, 0, 0, 0.3);
    }
`

export default HamburgerMenuStyles
