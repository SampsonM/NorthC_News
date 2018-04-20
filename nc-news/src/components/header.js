import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

class Header extends Component {
  render () {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand font-weight-bold text-danger" to="/">NC-News</NavLink>
        <MenuToggle />
        <NavItems />
      </nav>
    )
  }
}

class MenuToggle extends Component {
  render () {
    return (
      <div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" 
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    )
  }
}

class NavItems extends Component {
  render () {
    return (
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink to="/articles" className="nav-item nav-link">Articles</NavLink>
          <NavLink to="/topics" className="nav-item nav-link">Topics</NavLink>
          <NavLink to="/users" className="nav-item nav-link">Users</NavLink>
        </div>
      </div>
    )
  }
}

export default Header;