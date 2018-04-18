import React, {Component} from 'react';
import './css/articles.css'

class Articles extends Component {
  state = {
    loading : true,
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getArticles();
  }
  
  render () {
    const topicId = this.props.match.params.article_id;
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    
    if (!this.state.loading) {
      if (topicId) {
        return (
          <div>
            {this.filterArticlesById(topicId)}
          </div>
        )
      }
      return (
        <div className="px-5">
          {this.createArticleDivs()}
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
            <p className="mr-4 d-inline">votes: {votes}    </p><p className="mr-4 d-inline">comments: {comment_count}</p>
          </div>
        </div>
      )
    })
  }

  filterArticlesById = topicId => {
    const articles = this.state.articles.filter(article => {
      return topicId.includes(article.belongs_to)
    })
    this.createArticleDivs(articles)
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
  }

  sortArticlesByVote = articleArr => {
    return articleArr.sort((a, b) => {
      return b.votes - a.votes;
    })
  } 
}


export default Articles;