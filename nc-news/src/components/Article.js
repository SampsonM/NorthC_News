import React, { Component } from 'react';
import { ArticleFooter, Loading, Comments } from './index';
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
            <Header title={article.title} belongs_to={article.belongs_to} />
            <p className="card-body">{article.body}</p>
            <ArticleFooter votes={article.votes} 
              comments={article.comment_count} id={article._id}/>
          </div>
          <CommentBox id={article._id} user={this.props.user} 
            handleNewComment={this.handleNewcomment} 
          />
          <Comments id={article._id} loading={this.state.loading} 
            comments={this.state.comments} 
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

  sortComments = (comments) => {
    return comments.sort((a, b) => {
      return b.votes - a.votes
    })
  }

  handleNewcomment = comment => {
    this.setState({
      comments : [...this.state.comments, comment.data]
    })
  }
}

class Header extends Component {
  render() {
    const { title, belongs_to } = this.props;
    return (
      <div className="card-header bg-danger text-white d-flex">
        <h5 className="mb-0">{title}</h5>
        <p className="align-self-end ml-4 mb-0 " style={{fontSize : "0.8rem"}}>N/ {belongs_to.title}</p>
      </div>
    )
  }
}

class CommentBox extends Component {
  state= {
    comment : '',
    user : this.props.user
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
            <input onChange={this.handleChange} type="text" 
              className="card-body form-control" aria-label="Large" 
              aria-describedby="inputGroup-sizing-sm" style={{minHeight: "200px"}}/>
          </div>}
      </div>
    )
  }

  checkForUser = () => {
    return (this.state.user)
  }

  handleChange = event => {
    const value = event.target.value;
    this.setState({
      comment: value
    })
  }

  handleClick = event => {
    const { id } = this.props;
    const { comment } = this.state;
    const { user } = this.state;
    axios.post(`https://northc-news.herokuapp.com/api/articles/${id}/comments`, {
      comment : comment,
      created_by : user,
      belongs_to : id
      })
      .then(res => {
        this.props.handleNewComment(res)
      })
  }
}

export default Article;