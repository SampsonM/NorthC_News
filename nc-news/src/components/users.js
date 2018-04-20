import React, {Component} from 'react';
import {Loading} from './index';

class Users extends Component {
  state = {
    loading : true,
    users : [],
    user : ''
  }

  componentDidMount() {
    this.getUsers()
  }

  render () {
    if (this.state.loading) return <Loading />
    if (!this.state.loading) {
      return (
        <div>
          <div className="card bg-danger"><br /></div>
          <div className="d-flex flex-wrap mt-4">
            {this.state.users.map(({avatar_url, username, name, _id}, i) => {
              return (
                <div key={_id} className="card bg-danger mx-auto my-2" 
                  style={{width: "18rem", height: "100%"}}>
                  <img className="card-img-top" style={{minHeight: "286px"}} 
                    src={avatar_url} alt="profile face"></img>
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{username}</p>
                    <div>
                      <button id={name} onClick={this.handleClick} value="openProfile" 
                        className="btn btn-light px-1 py-0">
                        Profile
                      </button>
                      <button id={name} onClick={this.handleClick} value="switchUser" 
                        className="btn btn-light float-right px-1 py-0">
                        Switch User
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }

  handleClick = event => {
    const { value } = event.target;
    if (value === 'switchUser') {
      this.props.handleNewUser(event.target.id)
    }
  }

  getUsers = () => {
    fetch('https://northc-news.herokuapp.com/api/users')
      .then(res => res.json())
      .then(res => {
        this.setState({
          users : res,
          loading: false
        })
      })
  }
}

export default Users;