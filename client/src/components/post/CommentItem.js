import React, { Component } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {deleteComment} from '../../actions/postAction';
import PropTypes from 'prop-types';

class CommentItem extends Component {
  onClickDelete(post_id, comment_id) {
    this.props.deleteComment(post_id, comment_id);
  }

  render() {
    const {postId, comment} = this.props;
    const {user} = this.props.auth;
    return (
      <div className="row mt-2">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-1 text-right">
                  <img className="rounded img-fluid float-right" src={comment.avatar} alt={comment.user} style={{width: "35px"}} />
                </div>
                <div className="col-md-11 text-left">
                  <p>
                    {comment.name}
                    {' '}
                    <span className="text-muted">
                      <small>commented on <Moment format="Do MMM, YYYY">{comment.date}</Moment></small>
                    </span>
                  </p>
                  <p className="text-secondary">{comment.text}</p>
                  {comment.user === user.id && (
                    <a style={{cursor: "pointer"}} className="text-danger" onClick={this.onClickDelete.bind(this, postId, comment._id)}><small>Delete</small></a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);
