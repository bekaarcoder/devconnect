import React, { Component } from 'react'
import isEmpty from '../../validations/is-empty';
import Moment from 'react-moment';

class ProfileExp extends Component {
  render() {
    const {profile} = this.props;

    let experienceContent;
    if(isEmpty(profile.experience)) {
      experienceContent = (
        <p className="lead text-muted">No Experience added yet.</p>
      );
    } else {
      experienceContent = (
        <ul className="list-group">
          {profile.experience.map(exp => (
            <li className="list-group-item">
              <h4>{exp.company}</h4>
              <p>
                <Moment format="Do MMM, YYYY">{exp.from}</Moment>
                {" - "}
                {exp.current ? "Present" : <Moment format="Do MMM, YYYY">{exp.to}</Moment>}
              </p>
              {!isEmpty(exp.title) && <p><strong>Position: </strong>{exp.title}</p>}
              {!isEmpty(exp.location) && <p><strong>Location: </strong>{exp.location}</p>}
              {!isEmpty(exp.description) && <p><strong>Description: </strong>{exp.description}</p>}
            </li>
          ))}
        </ul>
      )
    }

    let educationContent;
    if(isEmpty(profile.education)) {
      educationContent = (
        <p className="lead text-muted">No Education added yet.</p>
      );
    } else {
      educationContent = (
        <ul className="list-group">
          {profile.education.map(edu => (
            <li className="list-group-item">
              <h4>{edu.title}</h4>
              <p>
                <Moment format="Do MMM, YYYY">{edu.from}</Moment>
                {" - "}
                {edu.current ? "Present" : <Moment format="Do MMM, YYYY">{edu.to}</Moment>}
              </p>
              <p><strong>Degree: </strong>{edu.degree}</p>
              <p><strong>Field of Study: </strong>{edu.field}</p>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h3>Professional Experience</h3>
              {experienceContent}
              <hr />
              <h3>Education</h3>
              {educationContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileExp;
