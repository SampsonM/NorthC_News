import React, {Component} from 'react';
import {Loading} from './index';

class Users extends Component {
  state = {
    loading : true,
    users : []
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
          <div className="d-flex mt-4">
            {this.state.users.map(({avatar_url, username, name, _id}) => {
              return (
                <div key={_id} className="card bg-danger m-2" style={{width: "18rem"}}>
                  <img className="card-img-top" style={{minHeight: "55%"}} src={avatar_url} alt="profile face"></img>
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{username}</p>
                    <a className="btn btn-light px-1 py-0">Profile</a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
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