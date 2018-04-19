import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Header from './components/header';
import Articles from './components/articles';
import Article from './components/Article';
import Topics from './components/topics';
import Users from './components/users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/articles/" component={Articles} />
        <Route path="/articles/:article_id" component={Article} />
        <Route path="/topics/" component={Topics} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
