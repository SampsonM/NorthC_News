import React, {Component} from 'react';
import ArticleFooter from './ArticleFooter';
import {Link} from 'react-router-dom';

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
        </div>
      )
    }
  }

  createArticleDivs = () => {
    return this.state.articles.map(({body, title, _id, votes, comment_count}) => {
      return (
        <div key={_id} className="card bg-light mb-2 mx-5" style={{maxWidth: '100%', boxShadow: "0 2px 5px #ccc"}}>
          <div className="card-header font-weight-bold border-danger">
            <Link className="text-danger" to={`/articles/${_id}`}>{title}</Link>
          </div>
          <div className="card-body">
            <p className="card-text">{body}</p>
          </div>
          <ArticleFooter votes={votes} comments={comment_count} id={_id} />
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
