import React, {Component} from 'react';
import { Loading, ArticleComponent } from './index';

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
      return <Loading />
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
    return this.state.articles.map(article => {
      return (
        <ArticleComponent key={article._id} article={article}/>
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
