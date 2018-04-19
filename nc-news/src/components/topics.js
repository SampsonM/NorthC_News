import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import ArticleFooter from './ArticleFooter';

class Topics extends Component {
  state = {
    loading : true
  };

  componentDidMount() {
    this.getTopics();
  }
  
  render () {
    if (!this.state.loading) {
      return (
      <div>
        <div className="d-flex justify-content-around">
          {this.state.topics.map(({_id, title}) => {
            return (
              <div className="card mt-5" key={_id} style={{width: "18rem"}}>
                <div className="card-body">
                  <h5 className="card-title">Topic: {title}</h5>
                  <Link to={`/topics/${_id}/articles`} id={_id} className="card-link">Get articles</Link>
                </div>
              </div>
            )
          })}
        </div>
        <hr />
        <Route path="/topics/:topicId/articles" component={Topic} />
      </div>
      )
    } 
    if (this.state.loading) {
      return <div>loading...</div>
    }
  }

  getTopics = () => {
    fetch('https://northc-news.herokuapp.com/api/topics')
      .then(res => res.json())
      .then(res => {
        res = this.sortTopics(res);
        this.setState({
          topics : res,
          loading : false
        })
      })
  }

  sortTopics = res => {
    return res.sort((a, b) => {
      return a.title - b.title;
    })
  }
}

class Topic extends Component {
  state = {
    loading : true,
  }

  componentDidMount() {
    const topicId = this.props.match.params.topicId;
    this.getArticlesById(topicId);
  }

  componentWillReceiveProps(nextprops) {
    const topicId = nextprops.match.params.topicId;
    this.getArticlesById(topicId);
  }
  
  render () {
    if (this.state.loading) {
      return (
        <div>Loading...</div>
      )
    }
    if (!this.state.loading){
      return (
        <div>
            {this.state.articles.map(({_id, body, votes, comment_count, title}) => {
              return (
                <div key={_id} className="card bg-light mb-2 mx-5" style={{maxWidth: '100%'}}>
                  <div className="card-header font-weight-bold border-danger">{title}</div>
                  <div className="card-body">
                    <p className="card-text">{body}</p>
                  </div>
                  <ArticleFooter votes={votes} comments={comment_count} id={_id} />
                </div>
              )
            })}
        </div>
      )
    }
  }

  getArticlesById = (id) => {
    return fetch(`https://northc-news.herokuapp.com/api/topics/${id}/articles`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          articles : res,
          loading : false
        })
      })
  }
}


export default Topics;