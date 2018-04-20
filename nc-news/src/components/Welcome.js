import React, { Component } from 'react';

class Welcome extends Component {
  render () {
    return (
      <div className="jumbotron mx-5 mt-5 p-4 pl-5" style={{minHeight: "500px"}}>
        <MainInfo />
        <InfoBtn />
      </div>
    )
  }
}

class MainInfo extends Component {
  render () {
    return (
      <div>
        <h1 className="display-4 my-4 text-danger">Hello, world!</h1>
        <p className="lead">Welcome To NorthC-News, a simple wiki full of articles from current, past and present students, and lecturers!</p>
        <hr className="my-4" /><br/>
        <p>To see all the top articles follow the articles button, to see the latest topics click topics, and to browse the users click users!</p><br/>
      </div>
    )
  }
}

class InfoBtn extends Component {
  render () {
    return (
      <div>
        <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModalCenter">
          More Info...
        </button>

        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" 
          aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">Info</h5>
              </div>
              <div className="modal-body">
                <h6>Welcome to NorthC-News.</h6>
                <hr/>
                <p>northcoders are busy creatures and need a way of keeping up with each others busy article reading,
                   thats why I created this platform so you can keep up with students busy readings.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome;
