import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withRouter } from '../../../node_modules/react-router-dom';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import PostFeed from './PostFeed';

class Posts extends Component {
  render() {
    return (
      <div className="row mt-4">
        <div className="col-md-12">
          <PostForm />
          <PostFeed />
        </div>
      </div>
    )
  }
}

export default connect(null)(withRouter(Posts));
