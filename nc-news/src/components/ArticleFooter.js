import React, {Component} from 'react';
import axios from 'axios';
const moment = require('moment');

class ArticleFooter extends Component {
  state = {
    voteAmount : this.props.votes
  }
  render () {
    const { comments, created, id } = this.props;
    return (
      <div className="p-1 card-footer d-inline border-danger align-items-center">
        <button className="btn bg-danger mr-2">
          <i onClick={this.handleClick} className="text-white fa fa-arrow-circle-up" ></i>
        </button>
        <p className="mr-4 d-inline align-middle">votes {this.state.voteAmount} </p>
        {this.checkForComments() && <DropDownComments comments={comments} id={id} />}
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
          <button onClick={this.getCommentsByArticle} className="btn align-middle d-inline btn-danger dropdown-toggle" aria-haspopup="true" aria-expanded="false">
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
            {/* <a className="dropdown-item" >Action</a>
            <a className="dropdown-item" >Another action</a>
            <a className="dropdown-item" >Something else here</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" >Separated link</a> */}
            {this.state.comments.map(({created_at, created_by}) => {
              return (
                <div className="dropdown-item">
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

export default ArticleFooter;