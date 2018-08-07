import React, { Component } from 'react'
// import isEmpty from '../../validations/is-empty';

class ProfileAbout extends Component {
  render() {
    const {profile} = this.props;
    const firstName = profile.user.name.trim().split(' ')[0];
    return (
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h2>{firstName}'s Bio</h2>
              <p className="lead">{profile.bio}</p>
              <hr />
              <h3>Skills</h3>
              <p>
                {profile.skills.map((skill, index) => (
                  <span className="badge badge-success badge-pill lead mr-2" key={index}>{skill}</span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileAbout;
