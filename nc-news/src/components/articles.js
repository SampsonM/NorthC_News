import React, {Component} from 'react';
import './css/articles.css'



class Articles extends Component {
  state = {
    loading : true,
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getArticlesByParam();
  }
  
  render () {
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    if (!this.state.loading) {
      return (
        <div>
          {this.state.articles.map(article => {
            return (
              <div key={article._id} className="card bg-light mb-3" style={{maxWidth: '100%'}}>
                <div className="card-header font-weight-bold border-danger">{article.title}</div>
                <div className="card-body">
                  <p className="card-text">{article.body}</p>
                </div>
                <div className="p-2 card-footer d-inline bg-transparent border-danger">
                  <p className="mr-4 d-inline">votes: {article.votes}    </p><p className="mr-4 d-inline">comments: {article.comment_count}</p>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }



  getArticlesByParam = () => {
    return fetch('https://northc-news.herokuapp.com/api/articles')
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.sortArticles(res);
        return this.setState({
          articles : res,
          loading: false
        })
      })
  }

  sortArticles = (articleArr) => {
    return articleArr.sort((a, b) => {
      return b.votes - a.votes;
    })
  } 
}


export default Articles;