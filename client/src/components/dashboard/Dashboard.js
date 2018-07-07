import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUserProfile} from '../../actions/profileAction';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getUserProfile();
	}

	render() {
		return (
			<div>
				<h1>Dashboard</h1>
			</div>
		)
	}
};

export default connect(null, {getUserProfile})(Dashboard);