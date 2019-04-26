import styled from 'styled-components'

const HamburgerMenuStyles = styled.div`
    /* Individual item */
    a {
        display: block;
        /* Our sidebar item styling */
        text-decoration: none;
        margin-bottom: 10px;
        color: ${props => props.theme.onSurface};
        transition: color 0.2s;
    }

    /* Change color on hover */
    a:hover {
        color: ${props => props.theme.secondary};
        transition: color 0.2s;
    }

    /* The rest copied directly from react-burger-menu docs */

    /* Position and sizing of burger button */
    .bm-burger-button {
        position: fixed;
        width: 36px;
        height: 27px;
        right: 30px;
        top: 20px;
    }

    /* Color/shape of burger icon bars */
    .bm-burger-bars {
        /* // [matt]: Add theme */
        background: ${props => props.theme.onPrimary};
        height: 15% !important;
        width: 90% !important;
    }

    /* Position and sizing of clickable cross button */
    .bm-cross-button {
        height: 24px;
        width: 24px;
    }

    /* Color/shape of close button cross */
    .bm-cross {
        background: ${props => props.theme.onSurface};
    }

    /* General sidebar styles */
    .bm-menu {
        background: ${props => props.theme.background};
        padding: 2.5em 1.5em 0;
        font-size: 1.15em;
    }

    /* Morph shape necessary with bubble or elastic */
    .bm-morph-shape {
        fill: ${props => props.theme.secondary};
    }

    /* Wrapper for item list */
    .bm-item-list {
        /* // [matt]: Add theme */
        color: ${props => props.theme.onSurface};
    }

    /* Styling of overlay */
    .bm-overlay {
        background: rgba(0, 0, 0, 0.3);
    }
`

export default HamburgerMenuStyles
