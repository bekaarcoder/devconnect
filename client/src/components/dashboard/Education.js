import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profileAction';

class Education extends Component {

  onClickDelete(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const educations = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.title}</td>
        <td>{edu.degree}</td>
        <td>{edu.field}</td>
        <td>
          <Moment format="Do MMM, YYYY">{edu.from}</Moment>
          {' to '}
          {edu.current ? 'Present' : <Moment format="Do MMM, YYYY">{edu.to}</Moment>}
        </td>
        <td><button type="button" className="btn btn-sm btn-danger" onClick={this.onClickDelete.bind(this, edu._id)}>Delete</button></td>
      </tr>
    ))
    return (
      <div className="row mt-4 mb-4">
        <div className="col-md-12">
          <h3 className="lead">Education</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">College/School</th>
                <th scope="col">Degree</th>
                <th scope="col">Field</th>
                <th scope="col">Duration</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {educations}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education);
