import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import{ ArticleFooter, Loading } from './index';

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
        <TopicCards topics={this.state.topics} />
        <hr />
        <Route path="/topics/:topicId/articles" component={TopicArticles} />
      </div>
      )
    } 
    if (this.state.loading) {
      return <Loading />
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


//** TOPIC CARD COMPONENT */
class TopicCards extends Component {
  render () {
    const { topics } = this.props;
    return(
      <div className="d-flex justify-content-around">
          {topics.map(({_id, title}) => {
            return (
              <div className="card mt-5" key={_id} style={{width: "18rem"}}>
                <div className="card-body">
                  <h5 className="card-title">Topic: {title}</h5>
                  <Link to={`/topics/${_id}/articles`} id={_id} className="card-link text-danger">Get articles</Link>
                </div>
              </div>
            )
          })}
        </div>
    )
  }
}


//** TOPICS ARTICLES */
class TopicArticles extends Component {
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
                  <div className="card-header font-weight-bold border-danger"><Link className="text-danger" to={`/articles/${_id}`}>{title}</Link></div>
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
        return this.sortArticlesByVote(res)
      })
      .then(res => {
        this.setState({
          articles : res,
          loading : false
        })
      })
  }

  sortArticlesByVote = res => {
    return res.sort((a, b) => {
      return b.votes - a.votes
    })
  }
}


export default Topics;