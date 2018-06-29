import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Landing extends Component {
	render () {
		return (
			<div>
				<div className="landingBg"></div>
				<div className="landing">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-md-8 mt-5">
								<h1 className="text-center display-3">Developers Connect</h1>
								<p className="text-center lead">Connect with developers around the world.</p>
								<p className="text-center lead">Create your developers profile & portfolio, share your posts accross various developers and get help from others.</p>
								<div className="text-center">
									<Link className="btn btn-primary" to="/register">SignUp</Link>
									<Link className="btn btn-success ml-3" to="/login">Login</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Landing;