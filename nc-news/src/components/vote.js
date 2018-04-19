import React, { Component } from 'react';

class Vote extends Component {
  render () {
    return (
      <div>
        {this.handleVote}
      </div>
    )
  }
  handleVote = ({match}) => {
    const id = match.props.params;
    console.log(id)
  }
}

export default Vote;