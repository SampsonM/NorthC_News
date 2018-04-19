import React, {Component} from 'react';

class Comments extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.getComments()
  }

  render () {
    return <div>Comments</div>
  }

  getComments = () => {
    fetch('')
  }
}

export default Comments;