import React, { Component } from 'react'
import { connect } from 'react-redux';

class PostFeedItem extends Component {
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
                    <button type="button" className="btn btn-danger">Delete</button>
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

export default connect(mapStateToProps, {})(PostFeedItem);
