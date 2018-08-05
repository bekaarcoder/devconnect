import React, { Component } from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {displayPost} from '../../actions/postAction';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import isEmpty from '../../validations/is-empty';

class Post extends Component {
  componentDidMount() {
    if(this.props.match.params.post_id) {
      this.props.displayPost(this.props.match.params.post_id);
    }
  }

  render() {
    const {post} = this.props.post;
    return (
      <div className="row mt-4 mb-4">
        <div className="col-md-12">
          <h2>Post</h2>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                <div>
                  <img className="rounded img-fluid mr-2 mx-autod-block" src={post.avatar} style={{width: "25px"}} alt={post.name}/>
                  <span className="lead align-middle">{post.name}</span>
                </div>
                <small className="text-muted">Posted on <Moment format="Do MMM, YYYY">{post.date}</Moment></small>
                <br />
                <small className="text-muted">{post.likes === undefined ? "0 Likes" : `${post.likes.length} likes`}</small>
                <p className="mt-3">{post.text}</p>
                </div>
              </div>
            </div>
          </div>
          <CommentForm post={post} />
          <h2 className="lead mt-4">Comments</h2>
          {isEmpty(post.comments) ?
            <p className="text-muted">No Comments</p> :
            <CommentFeed postId={post._id} comments={post.comments} />
          }
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  displayPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, {displayPost})(withRouter(Post));
