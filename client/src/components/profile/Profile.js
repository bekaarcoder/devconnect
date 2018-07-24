import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getProfileByHandle} from '../../actions/profileAction';

class Profile extends Component {

  componentDidMount() {
    if(this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const {profile} = this.props.profile
    return (
      <div>
        <h2>Profile Page</h2>
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
