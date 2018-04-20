import React, { Component } from 'react';
import { Loading, Comments, Article } from './index';

class ArticlePage extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    console.log(this.props) 
    const articleId = this.props.article_id;
    this.getArticle(articleId)
  }

  render () {
    if (this.state.loading) {
      return <Loading />
    }
    if (!this.state.loading) {
      const article = this.state.article[0];
      console.log(this.state.article)
      return (
        <div>
          <Article article={article} />
          <CommentBox />
          <Comments id={article._id} />
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
}

class CommentBox extends Component {
  render () {
    return (
      <div className="input-group input-group-lg mx-auto mb-0 mt-3" style={{maxWidth: "70%", minHeight:"200px"}}>
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-lg">Large</span>
        </div>
        <input type="text" className="w-75 form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
      </div>
    )
  }
}

export default ArticlePage;