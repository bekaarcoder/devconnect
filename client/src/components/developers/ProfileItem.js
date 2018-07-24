import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
// import isEmpty from '../../validations/is-empty';

class ProfileItem extends Component {
  render() {
    const {profile} = this.props;
    return (
      <div className="col-md-5 col-sm-12">
        <div className="card">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-4">
                <img src={profile.user.avatar} className="img-fluid mx-auto rounded-circle" alt={profile.user.name} />
              </div>
              <div className="col-md-8">
                <h2 className="lead">{profile.user.name}</h2>
                <p className="text-muted">{profile.status}</p>
                {profile.skills.splice(0, 5).map((skill, index) => (
                  <span className="badge badge-info mr-2" key={index}>{skill}</span>
                ))}
                <div className="mt-2">
                  <Link className="btn btn-success btn-sm" to={`/profile/${profile.handle}`}>View Profile</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
