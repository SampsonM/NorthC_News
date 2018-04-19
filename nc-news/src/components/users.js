import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';

class Users extends Component {
  state = {
    loading : false,
    submitted : false
  }

  render () {
    if (this.state.loading) return <div>LOADING...</div>
    if (!this.state.loading) {
      return (
        <div>
          <div className="card text-white bg-danger pb-4">
            <p className="text-center mt-4 mx-auto w-25">Search users!</p>
            <div className="card-body input-group mx-auto w-50">
              <Link to="/users/:user_id" user={this.state.inputValue} className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
              </Link>
              <input onChange={this.handleChange} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
            </div>
          </div>
          <br />
          <hr />

          <Route path="/users/:user_id"  component={User} />
        </div>

      )
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      inputValue : value
    })
  }
}

// const User = props => {

// }

class User extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {
    console.log(this.props.match.params)
    if (this.state.loading) {
      return (<div>LOADING...</div>)
    }
    if (!this.state.loading) {
      return <div>ready!!</div>
    }
  }

  getUsers = () => {
    fetch('https://northc-news.herokuapp.com/api/users')
      .then(res => res.json())
      .then(res => {
        this.getUserByName(res);
      })
  }

  getUserByName = (users) => {
    // users.filter(user => {
    //   return user.name === 
    // })
  }
}

export default Users;