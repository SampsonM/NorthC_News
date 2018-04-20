import React, { Component } from 'react';
import { Route } from "react-router-dom";
import {
  Header, Welcome, Articles, Article, Topics, Users, Profile
} from './components';

class App extends Component {
  state = {
    user : '',
    userId: ''
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Welcome} />
        <Route exact path="/articles/" component={Articles} />
        <Route path="/articles/:article_id"
          render={(props) => (<Article {...props} 
          userId={this.state.userId}
          user={this.state.user}/>)}
        />
        <Route path="/topics" component={Topics} />
        <Route exact path="/profile/:username" component={Profile} />
        <Route path="/users"
          render={(props) => (<Users {...props}
          handleNewUser={this.handleNewUser} 
          user={this.state.user} />)}
        />
       
      </div>
    );
  }

  handleNewUser = (user, userId) => {
    this.setState({
      user: user,
      userId : userId
    })
  }
}


export default App;
