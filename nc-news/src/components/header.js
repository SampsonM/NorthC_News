import React, {Component} from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
  render () {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand font-weight-bold text-danger" to="/articles">NC-News</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/comments" className="nav-item nav-link">Comments</Link>
            <Link to="/topics" className="nav-item nav-link">Topics</Link>
            <Link to="/users" className="nav-item nav-link">Users</Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header;