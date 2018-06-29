import React, { Component } from 'react';

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			  <a className="navbar-brand" href="#">DevConnect</a>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
			      <li className="nav-item">
			        <a className="nav-link" href="#">Developers</a>
			      </li>
			    </ul>
			    <ul className="navbar-nav my-2 my-lg-0">
			      <li className="nav-item">
			        <a className="nav-link" href="#">Login</a>
			      </li>
			      <li className="nav-item">
			        <a className="nav-link" href="#">SignUp</a>
			      </li>
			    </ul>
			  </div>
			</nav>
		);
	}
}

export default Navbar;