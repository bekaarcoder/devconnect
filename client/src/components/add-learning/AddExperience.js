import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import {addExperience} from '../../actions/profileAction';

 class AddExperience extends Component {
  
  constructor() {
    super();
    this.state = {
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
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
    const newExp = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current
    }
    this.props.addExperience(newExp, this.props.history);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const {errors} = this.state;
    return (
      <div>
        <h2 className="text-center mt-3">Add Your Experience</h2>
        <p className="lead text-muted text-center">Add any job or experience that you had in the past or current</p>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                name="company"
                placeholder="*Company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
              />
              <TextFieldGroup
                name="title"
                placeholder="*Job Title"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
              />
              <TextFieldGroup
                name="location"
                placeholder="Job Location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
              />
              <TextFieldGroup
                type="date"
                name="from"
                placeholder="Stated Working From*"
                value={this.state.from}
                onChange={this.onChange}
                error={errors.from}
              />
              <TextFieldGroup
                type="date"
                name="to"
                placeholder="Worked Till*"
                value={this.state.to}
                onChange={this.onChange}
                error={errors.to}
                disabled={this.state.disabled ? 'disabled' : ''}
              />
              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="current"
                  value={this.state.current}
                  checked={this.state.current}
                  onChange={this.onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">Current Job</label>
              </div>
              <TextareaFieldGroup
                name="description"
                placeholder="Add your job description"
                value={this.state.description}
                error={errors.description}
                onChange={this.onChange}
              />
              <div className="text-center">
                <input className="btn btn-primary" type="submit" value="Add Experience" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.error
});

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience));