import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUserProfile} from '../../actions/profileAction';
import isEmpty from '../../validations/is-empty';
import {Link} from 'react-router-dom';
import ProfileActions from './ProfileActions';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getUserProfile();
	}

	onDeleteClick(e) {
		// this.props.deleteProfile();
		console.log("Delete");
	}

	render() {
		const {user} = this.props.auth;
		console.log(user);
		const {profile, loading} = this.props.profile;
		let dashboardContent;
		if(profile === null || loading) {
			dashboardContent = <h4>Loading...</h4>
		} else {
			dashboardContent = (
				isEmpty(profile) ?
					<div>
						<h4 className="lead text-muted">Welcome {user.name}</h4>
						<p className="lead">You dont have any profile created. You can create now.</p>
						<Link className="btn btn-info" to="/create-profile">Create Profile</Link>
					</div>
					:
					<div>
						<h4 className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></h4>
						<ProfileActions />
						<div>
							<button className="btn btn-danger" type="button" onClick={this.onDeleteClick.bind(this)}>Delete My Account</button>
						</div>
					</div>
			)
		}

		return (
			<div className="mt-3">
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