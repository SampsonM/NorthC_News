import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Comments from './comments';

class Articles extends Component {
  state = {
    loading : true,
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getArticles();
  }
  
  render () {
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    if (!this.state.loading) {
      return (
        <div>
          <div className="px-5">
            {this.createArticleDivs()}
          </div>
  
          <Route path="http://northcoders-news-api.herokuapp.com/api/articles/:article_id?vote=up" component={} />
        </div>
      )
    }
  }

  createArticleDivs = () => {
    return this.state.articles.map(({_id, body, votes, comment_count, title}) => {
      return (
        <div key={_id} className="card bg-light mb-2 mx-5" style={{maxWidth: '100%'}}>
          <div className="card-header font-weight-bold border-danger">{title}</div>
          <div className="card-body">
            <p className="card-text">{body}</p>
          </div>
          <div className="p-2 card-footer d-inline bg-transparent border-danger">
            <Link to={`http://northcoders-news-api.herokuapp.com/api/articles/:${_id}?vote=up`}>
              <i className="fas fa-arrow-alt-circle-up"></i>
            </Link>
            <p className="mr-4 d-inline">votes: {votes}    </p><p className="mr-4 d-inline">comments: {comment_count}</p>
          </div>
        </div>
      )
    })
  }

  getArticles = () => {
    return fetch('https://northc-news.herokuapp.com/api/articles')
      .then(res => {
        return res.json();
      })
      .then(res => {
        res = this.sortArticlesByVote(res);
        return this.setState({
          articles : res,
          loading: false
        })
      })
      .catch(err => {
        console.log({err}, 'error')
      })
  }

  sortArticlesByVote = articleArr => {
    return articleArr.sort((a, b) => {
      return b.votes - a.votes;
    })
  } 
}


export default Articles;