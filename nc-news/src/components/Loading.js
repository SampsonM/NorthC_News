import React, { Component } from 'react';

class Loading extends Component {
  render () {
    return (
      <div className="w-100 mx-auto">
        <img className="mx-auto" src={`http://icon-park.com/imagefiles/loading7_red.gif`} style={{maxWidth: "50px"}}/>
      </div>
    )
  }
}

export default Loading;