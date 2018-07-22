import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from '../../../node_modules/react-router-dom';
import {getUserProfiles} from '../../actions/profileAction';

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
      profilesContent = (
        <p>Display Profiles</p>
      )
    }
    return (
      <div className="row mt-4">
        <div className="col-md-12">
          <h2 className="text-center">Developers</h2>
          <p className="text-center lead text-muted">Browse all developers and connect with them</p>
          {profilesContent}
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
  getUserProfiles: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, {getUserProfiles})(withRouter(Profiles));
