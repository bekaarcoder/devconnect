import React, { Component } from 'react';

class Login extends Component {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			email: '',
			password: '',
			errors: {}
		}
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

	}

	render() {
		return (
			<div className="row justify-content-center">
				<div className="col-md-6">
					<h2 className="text-center mt-5">Login</h2>
					<p className="text-center lead">Login to your DevConnect account.</p>
					<div className="card">
						<div className="card-body">
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<input type="text" className="form-control" name="email" placeholder="Email Address" value={this.state.email} onChange={this.onChange} autoComplete="nope" />
								</div>
								<div className="form-group">
									<input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange} autoComplete="new-password" />
								</div>
								<div className="text-center">
									<input type="submit" className="btn btn-info" value="Login" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;