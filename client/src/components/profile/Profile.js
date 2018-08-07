import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getProfileByHandle} from '../../actions/profileAction';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileExp from './ProfileExp';
import ProfileGithub from './ProfileGithub';

class Profile extends Component {

  componentDidMount() {
    if(this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.profile.profile === null && nextProps.profile.loading) {
      this.props.history.push('/profiles');
    }
  }

  render() {
    const {profile, loading} = this.props.profile;
    let profilePageContent;
    if(profile === null || loading) {
      profilePageContent = (
        <h3 className="text-center lead mt-3">Loading Profile...</h3>
      );
    } else {
      profilePageContent = (
        <div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileExp profile={profile} />
          <ProfileGithub profile={profile} />
        </div>
      )
    }


    return (
      <div className="row mt-4">
        <div className="col-md-12">
          {profilePageContent}
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, {getProfileByHandle})(Profile);
