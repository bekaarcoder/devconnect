import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authAction';

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

	componentWillReceiveProps(nextProps) {
		if(nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}

		if(nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(userData);
	}

	render() {
		const {errors} = this.state;
		return (
			<div className="row justify-content-center">
				<div className="col-md-6">
					<h2 className="text-center mt-5">Login</h2>
					<p className="text-center lead">Login to your DevConnect account.</p>
					<div className="card">
						<div className="card-body">
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="text"
										className={"form-control " + (errors.email && "is-invalid")}
										name="email"
										placeholder="Email Address"
										value={this.state.email}
										onChange={this.onChange}
										autoComplete="nope"
									/>
									<div className="invalid-feedback">
										{errors.email}
									</div>
								</div>
								<div className="form-group">
									<input
										type="password"
										className={"form-control " + (errors.password && "is-invalid")}
										name="password"
										placeholder="Password"
										value={this.state.password}
										onChange={this.onChange}
										autoComplete="new-password"
									/>
									<div className="invalid-feedback">
										{errors.password}
									</div>
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

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.error
})

export default connect(mapStateToProps, {loginUser})(Login);