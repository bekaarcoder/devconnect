import React, { Component } from 'react'
import {connect} from 'react-redux';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
  render() {
    const {postId, comments} = this.props;
    return (
      <div className="row mt-2">
        <div className="col-md-12">
          {comments !== undefined && comments.map(comment => 
            <CommentItem comment={comment} postId={postId} key={comment._id}/>
          )}
        </div>
      </div>
    )
  }
}

export default connect(null)(CommentFeed);
