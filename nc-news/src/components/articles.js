import React, {Component} from 'react';
import axios from 'axios';
import './css/articles.css'

class Articles extends Component {
  render () {
    const param = this.props.match.params.sort;
    const articles = getArticlesByParam(param)
    return articles;
  }
}

function getArticlesByParam (param) {
  return axios.get('https://northc-news.herokuapp.com/api/articles')
    .then(res => {
      const articleArr = res.data.slice(0);
      return Promise.all([sortArticles(articleArr, param)]);
    })
    .then(([res]) => {
      return console.log(res);
    })
}

function sortArticles (articleArr, param) {
    const sorted = articleArr.sort((a, b) => {
      return b.votes - a.votes;
    })


    sorted.map(article => {
      return (
        <div class="card bg-light mb-3" style={{maxWidth: '100%'}}>
          <div class="card-header">{article.title}</div>
          <div class="card-body">
            <p class="card-text">{article.body}</p>
          </div>
        </div>
      )
    })
}


export default Articles;