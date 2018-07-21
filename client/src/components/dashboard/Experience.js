import React, { Component } from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Moment from 'react-moment';

class Experience extends Component {
  render() {
    const experiences = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="Do MMM, YYYY">{exp.from}</Moment> to{' '} 
          {exp.current ? 'Present' : <Moment format="Do MMM, YYYY">{exp.to}</Moment>}
        </td>
        <td>{exp.location}</td>
        <td><button className="btn btn-sm btn-danger">Delete</button></td>
      </tr>
    ));

    return (
      <div className="row mt-4 mb-4">
        <div className="col-md-12">
          <h3 className="lead">Experience</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Company</th>
                <th scope="col">Job Title</th>
                <th scope="col">Duration</th>
                <th scope="col">Location</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
            {experiences}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default connect()(withRouter(Experience));
