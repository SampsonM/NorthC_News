import React, {Component} from 'react';

class Users extends Component {
  state = {
    loading : true,
    users : []
  }

  componentDidMount() {
    this.getUsers()
  }

  render () {
    if (this.state.loading) return <div>LOADING...</div>
    if (!this.state.loading) {
      return (
        <div>
          <div className="card bg-danger"><br /></div>
          <div className="d-flex mt-4">
            {this.state.users.map(user => {
              return (
                <div key={user._id} className="card bg-danger m-2" style={{width: "18rem"}}>
                  <img className="card-img-top" src={user.avatar_url} alt="profile face"></img>
                  <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.username}</p>
                    <a className="btn btn-primary">Profile</a>
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

// const User = () => {

//   if (this.state.loading) {
//     return (<div>LOADING...</div>)
//   }
//   if (!this.state.loading) {
//     return <div>ready!!</div>
//   }

//   // const user = 

//   const fetchUserWithState = () => {
//     const user = this.state.inputValue;
//     console.log(user)
//     if (!user) {
//       return <div>no</div>
//     } else {
//       this.getUsers(user);
//     }
//   }
// }

export default Users;