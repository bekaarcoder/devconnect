import React, { Component } from 'react';

class Landing extends Component {
	render () {
		return (
			<div>
				<div className="landingBg"></div>
				<div className="landing">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-md-8 mt-5">
								<h1 className="text-center">Developers Connect</h1>
								<p className="text-center">Connect with developers around the world.</p>
								<p className="text-center">Create your developers profile & portfolio, share your posts accross various developers and get help from others.</p>
								<div className="text-center">
									<button className="btn btn-primary">SignUp</button>
									<button className="btn btn-success ml-3">Login</button>
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