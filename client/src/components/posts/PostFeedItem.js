import React, { Component } from 'react'
import { connect } from 'react-redux';
import {deletePost} from '../../actions/postAction';
import PropTypes from 'prop-types';

class PostFeedItem extends Component {
  onClick(id) {
    this.props.deletePost(id);
  }

  render() {
    const {post} = this.props;
    const {user} = this.props.auth;
    return (
      <div className="col-md-12 mt-4">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-2 align-items-center">
                <img src={post.avatar} alt={post.name} className="img-fluid rounded-circle" />
              </div>
              <div className="col-md-10">
                <p>{post.text}</p>
                <div>
                  <button className="btn btn-info mr-2"><i className="fas fa-thumbs-up"></i> {post.likes.length}</button>
                  <button className="btn btn-info mr-2">Comments</button>
                  {user.id === post.user && (
                    <button type="button" className="btn btn-danger" onClick={this.onClick.bind(this, post._id)}>Delete</button>
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

PostFeedItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {deletePost})(PostFeedItem);
