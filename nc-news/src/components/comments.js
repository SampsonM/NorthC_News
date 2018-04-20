import React, {Component} from 'react';
import { Loading, DivFooter} from './index';

class Comments extends Component {
  state = {
    loading: true,
    comments : this.props.comments
  }

  componentWillReceiveProps (nextProps) {
    const { comments } = nextProps;
    this.setState({
      comments: comments
    })
  }

  render () {
    const { loading } = this.props;
    if (loading) {
      return <Loading />
    }
    if (!loading) {
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
              <DivFooter commentUser={created_by.name} 
                currentUser={this.props.user} id={_id} 
                votes={votes}
                deleteComment={this.props.deleteComment}
                user={this.props.user} created={created_at} />
            </div>
          )
        })}
        </div>
      )
    }
  }

}

export default Comments;