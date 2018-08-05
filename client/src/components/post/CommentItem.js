import React, { Component } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';

class CommentItem extends Component {
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
                    <a href="#" className="text-danger"><small>Delete</small></a>
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

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(CommentItem);
