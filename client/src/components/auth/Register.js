import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
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
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		axios.post('/api/users/register', newUser)
			.then(res => console.log(res.data))
			.catch(err => console.log(err.response.data));
	}

	render() {
		return (
			<div className="row justify-content-center">
				<div className="col-md-6">
					<h2 className="text-center mt-5">Sign Up</h2>
					<p className="text-center lead">Create your DevConnect account.</p>
					<div className="card">
						<div className="card-body">
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<input type="text" className="form-control" name="name" placeholder="Name" value={this.state.name} onChange={this.onChange} autoComplete="nope" />
								</div>
								<div className="form-group">
									<input type="text" className="form-control" name="email" placeholder="Email Address" value={this.state.email} onChange={this.onChange} autoComplete="nope" />
									<small className="form-text text-muted">Use a gravatar email if you want a profile image.</small>
								</div>
								<div className="form-group">
									<input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password}onChange={this.onChange} />
								</div>
								<div className="form-group">
									<input type="password" className="form-control" name="password2" placeholder="Confirm Password" value={this.state.password2} onChange={this.onChange} />
								</div>
								<div className="text-center">
									<input type="submit" className="btn btn-info" value="SignUp" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;