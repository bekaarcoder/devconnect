import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from '../../../node_modules/react-router-dom';
import {getUserProfiles} from '../../actions/profileAction';
import ProfileItem from './ProfileItem';

class Profiles extends Component {

  componentDidMount() {
    this.props.getUserProfiles();
  }

  render() {
    const {profiles, loading} = this.props.profile;
    let profilesContent;
    if(profiles === null || loading) {
      profilesContent = (
        <p className="text-center lead">Loading Profiles...</p>
      )
    } else {
      profilesContent = profiles.map(profile => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    }
    return (
      <div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h2 className="text-center">Developers</h2>
            <p className="text-center lead text-muted">Browse all developers and connect with them</p>
          </div>
        </div>
        <div className="row justify-content-around mt-5">
          {profilesContent}
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
  getUserProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, {getUserProfiles})(withRouter(Profiles));
