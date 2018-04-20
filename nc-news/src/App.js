import React, { Component } from 'react';
import { Route } from "react-router-dom";
import {
  Header, Welcome, Articles, Article, Topics, Users 
} from './components';

class App extends Component {
  state = {
    user : ''
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Welcome} />
        <Route exact path="/articles/" component={Articles} />
        <Route path="/articles/:article_id"
          render={(props) => (<Article {...props} 
          user={this.state.user}/>)}
        />
        <Route path="/topics" component={Topics} />
        <Route path="/users"
          render={(props) => (<Users {...props}
          handleNewUser={this.handleNewUser} 
          user={this.state.user} />)}
        />
      </div>
    );
  }

  handleNewUser = user => {
    this.setState({
      user: user
    })
  }
}


export default App;
