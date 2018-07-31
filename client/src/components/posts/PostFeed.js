import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts} from '../../actions/postAction';

class PostFeed extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const {posts} = this.props.post;
    return (
      <div className="row mt-4">
        <div className="col-md-12">
          <h2 className="lead mt-4">Post Feeds</h2>
          {posts.map(post => (
            <p>{post.text}</p>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, {getPosts})(PostFeed);