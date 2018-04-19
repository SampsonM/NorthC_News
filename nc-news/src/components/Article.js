import React, {Component} from 'react';
import ArticleFooter from './ArticleFooter';
import Comments from './comments'

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
            <Header title={article.title} belongs_to={article.belongs_to} />
            <div className="card-body">
              <p>{article.body}</p>
            </div>
            <ArticleFooter votes={article.votes} comments={article.comment_count} id={article._id}/>
          </div>
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

class Header extends Component {
  render() {
    const { title, belongs_to } = this.props;
    return (
      <div className="card-header bg-danger text-white d-flex">
        <h5 className="mb-0">{title}</h5>
        <p className="align-self-end ml-4 mb-0 " style={{fontSize : "0.8rem"}}>N/ {belongs_to.title}</p>
      </div>
    )
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

export default Article;