import React, { Component } from 'react';
import {Loading} from './index';

class Profile extends Component {
  state = {
    loading: true,
  }

  componentDidMount () {
    const { username } = this.props.match.params;
    console.log(username)
    this.getUserInfo(username)
  }

  // componentWillReceiveProps(nextprops) {
  //   const { user } = nextprops.location.state;
  //   console.log(nextprops.location)
  //   this.setState({
  //     user : user
  //   })
  // }

  render () {
    const { user } = this.state;
    if (this.state.loading) {
      return <Loading /> 
    }
    if (!this.state.loading) {
      return (
        <div className="card mt-2 mx-auto" style={{width: "25rem"}}>
          <img className="card-img-top" src={user.avatar_url} alt="profile face" />
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{user.username}</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
          <div className="card-body">
            <a className="card-link">Card link</a>
            <a className="card-link">Another link</a>
          </div>
        </div>
      )
    }
  }

  getUserInfo = id => {
    fetch(`https://northc-news.herokuapp.com/api/users/${id}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          user: res[0],
          loading: false
        })
      })
  }
}

export default Profile;