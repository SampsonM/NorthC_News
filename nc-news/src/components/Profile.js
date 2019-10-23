import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Loading} from './index';

class Profile extends Component {
  state = {
    loading: true,
  }

  componentDidMount () {
    const { username } = this.props.match.params;
    console.log(username)
    this.getUserInfo(username)
    this.getUserArticles(username)
  }

  render () {
    const { user } = this.state;
    if (this.state.loading) {
      return <Loading /> 
    }
    if (!this.state.loading) {
      return (
        <div>
          <div className="card mt-2 mx-auto" style={{width: "25rem"}}>
            <img className="card-img-top" src={user.avatar_url} alt="profile face" />
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
            </div>
            <ul className="list-group list-group-flush ">
              <li className="list-group-item bg-danger text-white text-uppercase">{user.username}</li>
            </ul>
          </div>

        <div>
          <div class="list-group mx-5 mb-5">
          <h5 className="bg-danger text-white mt-5 list-group-item">  {user.username}'s articles
          </h5>
            {this.state.articles.map(article => {
              return (
                <div>
                  <Link to={`/articles/${article._id}`}><p className="list-group-item list-group-item-action">{article.title}</p></Link>
                </div>
              )
            })}
          </div>
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
          user: res[0]
        })
      })
  }

  getUserArticles = id => {
    fetch(`https://northc-news.herokuapp.com/api/articles`)
      .then(res => res.json())
      .then(res => {
        const userid = this.state.user._id;
        return res.filter(article => article.created_by._id === userid)
      })
      .then(res => {
        this.setState({
          articles : res,
          loading : false
        })
      })
  }
}

export default Profile;