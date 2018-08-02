import React, { Component } from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

class Post extends Component {
  render() {
    return (
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>Post</h2>
        </div>
      </div>
    )
  }
}

export default connect(null)(withRouter(Post));
