import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
	render() {
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
			    <ul className="navbar-nav my-2 my-lg-0">
			      <li className="nav-item">
			        <Link className="nav-link" to="/login">Login</Link>
			      </li>
			      <li className="nav-item">
			        <Link className="nav-link" to="/register">SignUp</Link>
			      </li>
			    </ul>
			  </div>
			</nav>
		);
	}
}

export default Navbar;