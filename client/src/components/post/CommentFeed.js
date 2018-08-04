import React, { Component } from 'react'
import {connect} from 'react-redux';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
  render() {
    const {postId, comments} = this.props;
    return (
      <div className="row mt-2">
        <div className="col-md-12">
          <h2 className="lead">Comments</h2>
          {comments === undefined ? "No Comments" : comments.map(comment => 
            <CommentItem comment={comment} postId={postId} />
          )}
        </div>
      </div>
    )
  }
}

export default connect(null)(CommentFeed);
