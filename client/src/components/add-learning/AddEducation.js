import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import {addEducation} from '../../actions/profileAction';

class AddEducation extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      degree: '',
      field: '',
      from: '',
      to: '',
      current: false,
      errors: {},
      disabled: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
    const newEdu = {
      title: this.state.title,
      degree: this.state.degree,
      field: this.state.field,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current
    };
    this.props.addEducation(newEdu, this.props.history);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onCheck(e) {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });
  }

  render() {
    const {errors} = this.state;
    return (
      <div>
        <h2 className="text-center mt-4">Add Your Education</h2>
        <p className="lead text-center text-muted">Add your current and previous education details from where you have graduated</p>
        <div className="row justify-content-center">
          <div className="col-md-6 mt-4">
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                name="title"
                placeholder="College or School Name*"
                value={this.state.title}
                error={errors.title}
                onChange={this.onChange}
              />
              <TextFieldGroup
                name="degree"
                placeholder="Degree Name*"
                value={this.state.degree}
                error={errors.degree}
                onChange={this.onChange}
              />
              <TextFieldGroup
                name="field"
                placeholder="Field Name*"
                value={this.state.field}
                error={errors.field}
                onChange={this.onChange}
              />
              <TextFieldGroup
                type="date"
                name="from"
                placeholder="Started From*"
                value={this.state.from}
                error={errors.from}
                onChange={this.onChange}
              />
              <TextFieldGroup
                type="date"
                name="to"
                placeholder="Graduated on*"
                value={this.state.to}
                error={errors.to}
                onChange={this.onChange}
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
                <label htmlFor="current" className="form-check-label">Currently Learning</label>
              </div>
              <div className="text-center">
                <input type="submit" className="btn btn-primary" value="Add Education" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.error
});

export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));