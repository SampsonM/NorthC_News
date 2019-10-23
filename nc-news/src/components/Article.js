import React, { Component } from 'react';
import { DivFooter, Loading, Comments } from './index';
import axios from 'axios';

class Article extends Component {
  state = {
    loading: true,
    comments : []
  }

  componentDidMount() {
    const articleId = this.props.match.params.article_id;
    this.getArticle(articleId)
    this.getCommentsByArticle(articleId)
  }

  render () {
    if (this.state.loading) {
      return <Loading />
    }
    if (!this.state.loading) {
      const article = this.state.article[0];
      return (
        <div>
          <div className="card mx-5 mt-3">
            <Header title={article.title} name={article.created_by.name} belongs_to={article.belongs_to} />
            <p className="card-body">{article.body}</p>
            <DivFooter votes={article.votes} 
              comments={this.state.comments.length} id={article._id}/>
          </div>
          <CommentBox belongs_to={article._id} 
            created_by={this.props.userId} 
            handleNewComment={this.handleNewcomment} 
          />
          <Comments id={article._id} user={this.props.user} 
            loading={this.state.loading} 
            comments={this.state.comments}
            deleteComment={this.deleteComment}
          />
        </div>
      )
    }
  }

  getArticle = id => {
    fetch(`https://northc-news.herokuapp.com/api/articles/${id}`)
      .then(res => res.json())
      .then(articleResponse => {
        this.setState({
          article : articleResponse,
          loading : false
        })
      })
  }

  getCommentsByArticle = id => {
    fetch(`https://northc-news.herokuapp.com/api/articles/${id}/comments`)
      .then(res => res.json())
      .then(res => this.sortComments(res))
      .then(res => {
        this.setState({
          comments: res
        })
      })
  }

  deleteComment = id => {
    axios.delete(`https://northc-news.herokuapp.com/api/comments/${id}`)
      .then(res => {
        return res.data.filter(comment => comment.belongs_to._id === this.state.article[0]._id)
      })
      .then(res => {
        console.log(res)
        this.setState({
          comments : res
        })
      })
    }

  sortComments = (comments) => {
    return comments.sort((a, b) => {
      return b.votes - a.votes
    })
  }

  handleNewcomment = comment => {
    const articleId = this.props.match.params.article_id;
    this.getCommentsByArticle(articleId);
  }
}

class Header extends Component {
  render() {
    const { title, belongs_to, name } = this.props;
    return (
      <div className="card-header bg-danger text-white">
        <h5 className="mb-0">{title}</h5>
        <p className="align-self-end ml-4 mb-0 " style={{fontSize : "0.8rem"}}>N/ {belongs_to.title}</p>
        <p className="float-right mb-0 font-weight-light d-inline"
          style={{top: "10px",right:"10px", position: "absolute"}}>
          Author {name}
        </p>
      </div>
    )
  }
}

//** COMMENT BOX */
class CommentBox extends Component {
  state = {
    comment : '',
    created_by : this.props.created_by,
    belongs_to : this.props.belongs_to,
    value : "enter text.."
  }

  render () {
    return (
      <div className="input-group input-group-lg mx-auto mb-0 mt-3 d-flex align-content-end" style={{maxWidth: "70%"}}> 
        <button onClick={this.handleClick} 
          className="btn btn-outline-danger ml-2 mr-4" 
          style={{maxHeight: "50px"}}        
          id="inputGroup-sizing-lg">
          Comment!
        </button>
        {!this.checkForUser() && 
          <div className="w-75 card ml-5">
            <p className="card-body">Please switch to a user to add comments</p>
          </div>}
        {this.checkForUser() && 

          <div className="w-75 card ml-5">
            <input onChange={this.handleChange} placeholder="enter text.." type="text" 
              className="card-body form-control" aria-label="Large" 
              aria-describedby="inputGroup-sizing-sm" style={{minHeight: "200px"}}/>
          </div>}
      </div>
    )
  }

  checkForUser = () => {
    return (this.state.created_by)
  }

  handleChange = event => {
    const value = event.target.value;
    this.setState({
      comment: value
    })
  }

  handleClick = event => {
    const { belongs_to } = this.state;
    const { comment } = this.state;
    const { created_by } = this.state;
    axios.post(`https://northc-news.herokuapp.com/api/articles/${belongs_to}/comments`, {
      comment : comment,
      created_by : created_by,
      belongs_to : belongs_to
      })
      .then(res => {
        this.props.handleNewComment(res)
      })
  }
}

export default Article;