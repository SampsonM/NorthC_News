import React, {Component} from 'react';
import axios from 'axios';
const moment = require('moment');

class DivFooter extends Component {
  state = {
    voteAmount : this.props.votes
  }

  render () {
    const { comments, created, id } = this.props;
    return (
      <div className="p-1 card-footer d-inline border-danger">
        <button onClick={this.handleClick} className="btn bg-danger mr-2">
          <i className="text-white fa fa-arrow-circle-up" ></i>
        </button>
        <p className="mr-4 d-inline align-middle">
          votes {this.state.voteAmount} 
        </p>
        {
          this.checkForComments() && 
          <DropDownComments comments={comments} id={id} />
        }
        {
          !this.checkForComments() && 
          <p style={{fontSize : "0.8rem"}} 
          className="align-self-end d-inline">{moment(created).fromNow()}</p>
        }
        {
          this.checkForUser() &&
          <button onClick={this.handleDeleteClick} 
            className="align-self-middle d-inline float-right mb-0" >
            <i class="fa fa-times-circle text-danger" />
          </button>
        }
      </div>
    )
  }

  checkForUser = () => {
    const { currentUser } = this.props;
    const { commentUser } = this.props;
    if (currentUser === commentUser && currentUser !== undefined) return true;
  }

  handleDeleteClick = () => {
    
  }

  handleClick = (event) => {
    if (this.checkForComments()) {
      this.incrementVotes('articles')
    } else {
      this.incrementVotes('comments')
    }
  }

  incrementVotes = (path) => {
    const id = this.props.id;
    axios.put(`https://northc-news.herokuapp.com/api/${path}/${id}?vote=up`)
      .then(res => {
        const votes = (path === 'comments') ? res.data[0].votes : res.data.votes;
        this.setState({
          voteAmount : votes
        })
      })
  }

  checkForComments = () => {
    if (this.props.comments > 0) return true;
  }
}

class DropDownComments extends Component {
  state = {
    loading : true
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="btn-group">
          <button onClick={this.getCommentsByArticle} 
            className="btn align-middle d-inline btn-outline-danger dropdown-toggle" 
            aria-haspopup="true" aria-expanded="false">
            Comments {this.props.comments}
          </button>
        </div>
      )
    }
    if (!this.state.loading) {
      return (
        <div className="btn-group">
          <button type="button" className="btn align-middle d-inline btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Comments {this.props.comments}
          </button>
          <div className="dropdown-menu">
            {this.state.comments.map(({_id, created_at, created_by}) => {
              return (
                <div key={_id} className="dropdown-item">
                  <p className="d-inline">{created_by.name}</p>
                  <p className="d-inline ml-1" style={{fontSize : "0.8rem"}}>{moment(created_at).fromNow()}</p>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }

  getCommentsByArticle = () => {
    const id = this.props.id;
    fetch(`https://northc-news.herokuapp.com/api/articles/${id}/comments`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          comments: res,
          loading: false
        })
      })
  }
}

export default DivFooter;