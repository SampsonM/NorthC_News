import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Topics extends Component {
  state = {
    loading : true
  };

  componentDidMount() {
    this.setState({ loading : true });
    this.getTopics();
  }

  render () {
    if (!this.state.loading) {
      return (
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
    )
    } else {
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

export default Topics;