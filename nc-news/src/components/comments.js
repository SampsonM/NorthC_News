import React, {Component} from 'react';
import ArticleFooter from './ArticleFooter';

class Comments extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    const id = this.props.id;

    this.getCommentsByArticle(id)
  }

  render () {
    if (this.state.loading) {
      return <div>LOADING...</div>
    }
    if (!this.state.loading) {
      console.log(this.state.comments)
      return (
        <div className="mt-3">
        {this.state.comments.map(({_id, belongs_to, created_by, votes, body, created_at}) => {
          return (
            <div key={_id} className="card p-1 mt-1 mx-auto w-75" style={{boxShadow: "0 2px 5px #ccc"}}>
              <div className="card-header p-2 bg-danger text-white align-items-center justify-content-end">
                <p className="d-inline">{belongs_to.title}</p>
                <p className="d-inline float-right mb-0" style={{fontSize: "0.8rem"}}>Posted by {created_by.name}</p>
              </div>
              <div className="card-body">
                <p className="m-0">{body}</p>
              </div>
              <ArticleFooter id={_id} votes={votes} created={created_at} />
            </div>
          )
        })}
      </div>
    )
    }
  }

  getCommentsByArticle = id => {
    fetch(`https://northc-news.herokuapp.com/api/articles/${id}/comments`)
      .then(res => res.json())
      .then(res => this.sortComments(res))
      .then(res => {
        this.setState({
          comments: res,
          loading: false
        })
      })
  }

  sortComments = (comments) => {
    return comments.sort((a, b) => {
      return b.votes - a.votes
    })
  }
}

export default Comments;