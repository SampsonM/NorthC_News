import React, { Component } from 'react';
import { Route } from "react-router-dom";
import {
  Header, Welcome, Articles, Article, Topics, Users 
} from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Welcome} />
        <Route exact path="/articles/" component={Articles} />
        <Route path="/articles/:article_id" component={Article} />
        <Route path="/topics/" component={Topics} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
