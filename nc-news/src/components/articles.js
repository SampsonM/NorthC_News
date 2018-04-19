import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
// import Vote from './vote';

class Articles extends Component {
  state = {
    loading : true,
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getArticles();
  }
  
  render () {
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    if (!this.state.loading) {
      return (
        <div>
          <div className="px-5">
            {this.createArticleDivs()}
          </div>
  
          <Route path="/articles/:article_id?vote=up" component={Vote} />
        </div>
      )
    }
  }

  createArticleDivs = () => {
    return this.state.articles.map(({_id, body, votes, comment_count, title}) => {
      return (
        <div key={_id} className="card bg-light mb-2 mx-5" style={{maxWidth: '100%'}}>
          <div className="card-header font-weight-bold border-danger">{title}</div>
          <div className="card-body">
            <p className="card-text">{body}</p>
          </div>
          <div className="p-2 card-footer d-inline bg-transparent border-danger">
            <LinkBtn id={_id}/>
            <p className="mr-4 mt-1 d-inline">votes: {votes} </p><p className="mr-4 mt-1 d-inline">comments: {comment_count} </p>
          </div>
        </div>
      )
    })
  }

  getArticles = () => {
    return fetch('https://northc-news.herokuapp.com/api/articles')
      .then(res => {
        return res.json();
      })
      .then(res => {
        res = this.sortArticlesByVote(res);
        return this.setState({
          articles : res,
          loading: false
        })
      })
      .catch(err => {
        console.log({err}, 'error')
      })
  }

  sortArticlesByVote = articleArr => {
    return articleArr.sort((a, b) => {
      return b.votes - a.votes;
    })
  } 

  IncrementVote = ({ match }) => {
    
    
  }
}

const LinkBtn = ({id}) => {
  return (
    <button className="btn btn-light mr-2">
      <Link to={`/articles/:${id}?vote=up`} id={id}><i className="fa fa-arrow-circle-up" ></i></Link>
    </button>
  )
}

class Vote extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    const id = this.props.match.params.article_id;
    this.IncrementVote(id)
  }

  render () {
    if (!this.state.loading) {
      return
    }
  }

  incrementVote = id => {
    console.log('vote')
    console.log(this.props.match.params.article_id)
    fetch(`http://northcoders-news-api.herokuapp.com/api/articles/:${id}?vote=up`)
      .then(res => res.json())
      .then(console.log)
      .then(() => {
        this.setState({ loading: false })
      })
  }
}



export default Articles;