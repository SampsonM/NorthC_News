import React, {Component} from 'react';

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