import React, {Component} from 'react';
import './css/articles.css'



class Articles extends Component {
  state = {
    loading : true,
  }

  componentDidMount() {
    const param = this.props.match.params.sort;
    console.log(param)
    this.getArticlesByParam(param);
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
              <div class="card bg-light mb-3" style={{maxWidth: '100%'}}>
                <div class="card-header">{article.title}</div>
                <div class="card-body">
                  <p class="card-text">{article.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }



  getArticlesByParam = (param) => {
    this.setState({
      loading : true
     });
  
    return fetch('https://northc-news.herokuapp.com/api/articles')
     .then(res => {
        res.json();
     })
      .then(res => {
        const articleArr = res.data.slice(0);
        return Promise.all([this.sortArticles(articleArr, param)]);
      })
      .then(([res]) => {
        this.setState({
          articles : res,
          loading: false
        })
        return res;
      })
  }

  sortArticles = (articleArr, param) => {
    return articleArr.sort((a, b) => {
      return b.votes - a.votes;
    })
  } 
}


export default Articles;