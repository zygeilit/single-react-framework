import React from 'react'
import NavLink from './NavLink'

import './../../css/main.scss'

class BasePage extends React.Component {
  render() {
    return (
      <div className="main-class">
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/repos">Repos</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default BasePage
