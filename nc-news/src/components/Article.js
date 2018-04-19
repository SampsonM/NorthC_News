import React, {Component} from 'react';
import ArticleFooter from './ArticleFooter';
import Comment from './comments'

class Article extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    const articleId = this.props.match.params.article_id;
    this.getArticle(articleId)
  }

  render () {
    if (this.state.loading) {
      return <div>LOADING...</div>
    }
    if (!this.state.loading) {
      const article = this.state.article[0];
      return (
        <div>
          <div className="card mx-5 mt-3">
            <div className="card-header">{article.title}</div>
            <div className="card-body">
              <p>{article.body}</p>
            </div>
            <ArticleFooter votes={article.votes} comments={article.comment_count} id={article._id}/>
          </div>
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

export default Article;