import React, { Component } from 'react';
import { Browser as Router, Route, Link } from "react-router-dom";
import Header from './components/header';
import Articles from './components/articles';
import Comments from './components/comments';
import Topics from './components/topics';
import Users from './components/users';
import './components/css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Articles} />
        <Route path="/comments" component={Comments} />
        <Route path="/topics" component={Topics} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
