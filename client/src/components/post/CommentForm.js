import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import {addComment} from '../../actions/postAction';
import PropTypes from 'prop-types'

class CommentForm extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const {user} = this.props.auth;
    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addComment(newComment, this.props.post._id);
    this.setState({
      text: ''
    });
  }

  render() {
    const {errors} = this.state;

    return (
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-info text-light">Make a Comment</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <TextareaFieldGroup
                  name="text"
                  placeholder="Put your comment here"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                  autoComplete="nope"
                />
                <input type="submit" className="btn btn-success btn-sm" value="Post Comment" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.error
});

export default connect(mapStateToProps, {addComment})(CommentForm);
