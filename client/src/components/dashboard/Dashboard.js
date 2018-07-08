import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUserProfile} from '../../actions/profileAction';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getUserProfile();
	}

	render() {
		const {user} = this.props.auth;
		console.log(user);
		const {profile, loading} = this.props.profile;
		let dashboardContent;
		if(profile === null || loading) {
			dashboardContent = <h4>Loading...</h4>
		} else {
			dashboardContent = <h1>Your Profile</h1>
		}
		return (
			<div>
				<h1>Dashboard</h1>
				{dashboardContent}
			</div>
		)
	}
};

Dashboard.propTypes = {
	getUserProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, {getUserProfile})(Dashboard);