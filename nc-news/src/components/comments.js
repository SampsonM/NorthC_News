import React, {Component} from 'react';

class Comments extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    const id = this.props.id;
    
    // if (id.length > 0) {
      this.getCommentsByArticle(this.props.id)
    // } else {
    //   this.getComments()
    // }
  }

  render () {
    return <div>Comments</div>
  }

  getComments = () => {
    fetch('')
  }

  getCommentsByArticle = () => {
    return <div>article comment</div>
  }
}

export default Comments;