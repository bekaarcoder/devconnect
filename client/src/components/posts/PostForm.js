import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import {addPost} from '../../actions/postAction';

class PostForm extends Component {
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

  onSubmit(e) {
    e.preventDefault();
    const {user} = this.props.auth;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addPost(newPost);
    this.setState({
      text: '',
      errors: {}
    });
  }
  
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const {errors} = this.state;
    return (
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-info">
              <span className="lead text-light">Create A Post</span>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <TextareaFieldGroup
                  name="text"
                  placeholder="Put your stuff here..."
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                  autoComplete="nope"
                />
                <input type="submit" className="btn btn-success" value="Create Post" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.error
});

export default connect(mapStateToProps, {addPost})(PostForm);