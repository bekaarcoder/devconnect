import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withRouter } from '../../../node_modules/react-router-dom';

class Posts extends Component {
  render() {
    return (
      <div>
        <h2>Posts</h2>
      </div>
    )
  }
}

export default connect(null)(withRouter(Posts));
