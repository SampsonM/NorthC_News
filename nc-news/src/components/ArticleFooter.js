import React from 'react-router-dom';

class ArticleFooter extends Component {
  state = {
    voteAmount : this.props.votes
  }
  render () {
    const {id, comments} = this.props;
    return (
      <div className="p-2 card-footer d-inline bg-transparent border-danger">
        <button className="btn btn-light mr-2">
          <i onClick={() => this.incrementVote(id)} className="fa fa-arrow-circle-up" ></i>
        </button>
        <p className="mr-4 mt-1 d-inline">votes: {this.state.voteAmount} </p>
        <p className="mr-4 mt-1 d-inline">comments: {comments}</p>
      </div>
    )
  }

  incrementVote = id => {
    axios.put(`https://northc-news.herokuapp.com/api/articles/${id}?vote=up`)
      .then(r => {
        const votes = r.data.votes;
        this.setState({
          voteAmount: votes,
        })
    })
      .catch(console.log)
    
  }
}

export default ArticleFooter;