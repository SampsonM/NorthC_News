import React, {Component} from 'react';
import { Browser as Router, Route, Link } from "react-router-dom";
import './css/header.css';

class Header extends Component {
  render () {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" to="/">NC-News</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link class="nav-item nav-link" to="/">New<span class="sr-only"></span></Link>
            <Link to="/comments" class="nav-item nav-link">Comments</Link>
            <Link to="/topics" class="nav-item nav-link">Topics</Link>
            <Link to="/users" class="nav-item nav-link">Users</Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header;