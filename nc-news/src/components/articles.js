import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
        </div>
      )
    }
  }

  createArticleDivs = () => {
    return this.state.articles.map((article) => {
      return (
        <div key={article._id} className="card bg-light mb-2 mx-5" style={{maxWidth: '100%'}}>
          <div className="card-header font-weight-bold border-danger">{article.title}</div>
          <div className="card-body">
            <p className="card-text">{article.body}</p>
          </div>
          <div className="p-2 card-footer d-inline bg-transparent border-danger">
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

  incrementVote = id => {
    axios.put(`https://northc-news.herokuapp.com/api/articles/${id}?vote=up`)
      .then(r => {
        console.log(r.data.votes)
        // const stream = new ReadableStream({
        //   start(controller) {
        //     function push () {
        //       r.body.getReader().read().then()(({done, value}) => {
        //         if (done) {
        //           controller.close();
        //           return;
        //         }
        //         controller.enqueue(value);
        //         push();
        //       })
        //     }
        //     push();
        //   }
        // })
        // return new Response(stream, {headers: { "Content-Type": "text/html" }})      })
      // .then(res => res.json())
    })
      .catch(console.log)
    
  }
}

// function footer () {
//   return (
//     <div>
//       <button className="btn btn-light mr-2">
//         <i onClick={() => this.incrementVote(article._id)} className="fa fa-arrow-circle-up" ></i>
//       </button>
//       <p className="mr-4 mt-1 d-inline">votes: {article.votes} </p>
//       <p className="mr-4 mt-1 d-inline">comments: {article.comment_count}</p>
//     </div>
//   )
// }

// class Vote extends Component {
//   state = {
//     loading: true
//   }

//   componentDidMount() {
//     
//     this.IncrementVote(id)
//   }

//   render () {
//     if (!this.state.loading) {
//       return
//     }
//   }

//   incrementVote = id => {
//     console.log('vote')
//     console.log(this.props.match.params.article_id)
//     
//   }
// }



export default Articles;