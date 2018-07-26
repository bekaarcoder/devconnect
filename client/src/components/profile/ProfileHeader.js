import React, { Component } from 'react'
import isEmpty from '../../validations/is-empty';

class ProfileHeader extends Component {
  render() {
    const profile = this.props.profile;
    return (
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card text-white bg-info">
            <div className="card-body text-center">
              <img src={profile.user.avatar} className="rounded-circle mx-auto" alt={profile.user.name} />
              <h2 className="mt-2">{profile.user.name}</h2>
              <p className="lead">{profile.status} {!isEmpty(profile.company) && `at ${profile.company}`}</p>
              {!isEmpty(profile.location) && <p className="lead mt-2">{profile.location}</p>}
              <p>
                {isEmpty(profile.website) ? null :
                  (
                    <span className="mr-3">
                      <a href={profile.website} className="text-white" target="_blank"><i className="fas fa-globe fa-2x"></i></a>
                    </span>
                  )
                }
                {isEmpty(profile.github) ? null :
                  (
                    <span className="mr-3">
                      <a href={profile.github} className="text-white" target="_blank"><i className="fab fa-github fa-2x"></i></a>
                    </span>
                  )
                }
                {isEmpty(profile.social && profile.social.facebook) ? null :
                  (
                    <span className="mr-3">
                      <a href={profile.social.facebook} className="text-white" target="_blank"><i className="fab fa-facebook fa-2x"></i></a>
                    </span>
                  )
                }
                {isEmpty(profile.social && profile.social.twitter) ? null :
                  (
                    <span className="mr-3">
                      <a href={profile.social.twitter} className="text-white" target="_blank"><i className="fab fa-twitter fa-2x"></i></a>
                    </span>
                  )
                }
                {isEmpty(profile.social && profile.social.instagram) ? null :
                  (
                    <span className="mr-3">
                      <a href={profile.social.instagram} className="text-white" target="_blank"><i className="fab fa-instagram fa-2x"></i></a>
                    </span>
                  )
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileHeader;
