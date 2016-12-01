// modules/NavLink.js
import React from 'react'
import { Link } from 'react-router'

class NavLink extends React.Component {

    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
    }

    change(e) {
        e.preventDefault();
        this.props.changeLink('changeLink');
    }

    render() {
        return (<Link onClick={this.change} activeClassName="active">{this.props.children}</Link>)
    }
}

export default NavLink