import React, {Component} from 'react';

class Users extends Component {
  state = {
    loading : true
  }

  componentDidMount() {
    this.getUsers()
  }

  componentWillReceiveProps(nextProps) {
    
  }

  render () {
    if (this.state.loading) return <div>LOADING...</div>
    if (!this.state.loading) {
      return (
        <div>
          <p className="text-center card mt-4 mx-auto w-25">Search users!</p>
          <div className="input-group mx-auto mt-5 w-50">
            <div className="input-group-prepend">
              <span onClick={() => {}} className="input-group-text" id="inputGroup-sizing-default">Search</span>
            </div>
            <input onChange={this.handleChange} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
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

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      inputValue : value
    })
  }
}

export default Users;