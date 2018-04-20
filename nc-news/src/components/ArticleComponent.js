import React, { Component } from 'react';
import { Link }from 'react-router-dom';
import { DivFooter } from './index';

class ArticleComponent extends Component {
  render () {
    const { _id, body, comment_count, votes, title, created_by } = this.props.article;
    return (
      <div className="card bg-light mb-2 mx-5" style={{maxWidth: '100%'}}>
        <div className="card-header font-weight-bold border-danger">
          <Link className="text-danger" to={`/articles/${_id}`}>{title}</Link>
          <p className="float-right mb-0 font-weight-light d-inline">Author {created_by.name}</p>
        </div>
        <div className="card-body">
          <p className="card-text">{body}</p>
        </div>
        <DivFooter votes={votes} comments={comment_count} id={_id} />
      </div>
    )
  }
}

export default ArticleComponent;