import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authAction';

class Navbar extends Component {
	onLogout(e) {
		e.preventDefault();
		this.props.logoutUser();
		window.location.href = '/login'
	}
	render() {
		const {isAuthenticated, user} = this.props.auth;
		console.log(isAuthenticated);
		const guestLinks = (
			<ul className="navbar-nav my-2 my-lg-0">
	      <li className="nav-item">
	        <Link className="nav-link" to="/login">Login</Link>
	      </li>
	      <li className="nav-item">
	        <Link className="nav-link" to="/register">SignUp</Link>
	      </li>
	    </ul>
		);

		const authLinks = (
			<ul className="navbar-nav my-2 my-lg-0">
	      <li className="nav-item">
	        <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
	        	<img
	        		className="rounded-circle"
	        		src={user.avatar}
	        		alt={user.name}
	        		style={{width: '25px', marginRight: '5px'}}
	        	/>
	        	Logout
	        </a>
	      </li>
	    </ul>
		);

		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			  <Link className="navbar-brand" to="/">DEVCONNECT</Link>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
			      <li className="nav-item">
			        <Link className="nav-link" to="/profiles">Developers</Link>
			      </li>
			    </ul>
			    {isAuthenticated ? authLinks : guestLinks}
			  </div>
			</nav>
		);
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);