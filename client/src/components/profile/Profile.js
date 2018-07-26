import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getProfileByHandle} from '../../actions/profileAction';
import ProfileHeader from './ProfileHeader';

class Profile extends Component {

  componentDidMount() {
    if(this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
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
        <ProfileHeader profile={profile} />
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
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, {getProfileByHandle})(Profile);
