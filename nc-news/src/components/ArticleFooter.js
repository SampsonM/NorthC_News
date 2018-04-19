import React, {Component} from 'react';
import axios from 'axios';
const moment = require('moment');

class ArticleFooter extends Component {
  state = {
    voteAmount : this.props.votes
  }
  render () {
    const { comments, created } = this.props;
    return (
      <div className="p-1 card-footer d-inline border-danger align-items-center">
        <button className="btn bg-danger mr-2">
          <i onClick={this.handleClick} className="text-white fa fa-arrow-circle-up" ></i>
        </button>
        <p className="mr-4 d-inline align-middle">votes {this.state.voteAmount} </p>
        {this.checkForComments() && <p className="align-middle  d-inline">comments {comments}</p>}
        {!this.checkForComments() && <p className="align-middle d-inline ml-2 mb-0">{moment(created).fromNow()}</p>}
      </div>
    )
  }

  handleClick = (event) => {
    if (!this.checkForComments()) {
      this.incrementVotes('comments')
    } else {
      this.incrementVotes('articles')
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
    if (this.props.comments > 0) return true
  }
}

export default ArticleFooter;