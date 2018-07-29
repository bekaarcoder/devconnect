import React, { Component } from 'react'
import isEmpty from '../../validations/is-empty';

class ProfileGithub extends Component {
  render() {
    const {profile} = this.props;
    let content;
    if(isEmpty(profile.github)) {
      content = (
        <p className="lead">No Github profile added yet.</p>
      );
    } else {
      content = (
        <p className="lead">No Github profile</p>
      );
    }
    return (
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h3>Github Profile</h3>
              {content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileGithub;
