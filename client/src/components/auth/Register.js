import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authAction';

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

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			console.log(nextProps);
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
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.registerUser(newUser, this.props.history);
		/*axios.post('/api/users/register', newUser)
			.then(res => console.log(res.data))
			.catch(err => this.setState({
				errors: err.response.data
			}));*/
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
									<input
										type="text"
										className={"form-control " + (this.state.errors.name && "is-invalid")}
										name="name"
										placeholder="Name"
										value={this.state.name}
										onChange={this.onChange}
										autoComplete="nope"
									/>
									<div className="invalid-feedback">
										{this.state.errors.name}
									</div>
								</div>
								<div className="form-group">
									<input
										type="text"
										className={"form-control " + (this.state.errors.email && "is-invalid")}
										name="email"
										placeholder="Email Address"
										value={this.state.email}
										onChange={this.onChange}
										autoComplete="nope"
									/>
									<div className="invalid-feedback">
										{this.state.errors.email}
									</div>
									<small className="form-text text-muted">Use a gravatar email if you want a profile image.</small>
								</div>
								<div className="form-group">
									<input
										type="password"
										className={"form-control " + (this.state.errors.password && "is-invalid")}
										name="password"
										placeholder="Password"
										value={this.state.password}
										onChange={this.onChange}
									/>
									<div className="invalid-feedback">
										{this.state.errors.password}
									</div>
								</div>
								<div className="form-group">
									<input
										type="password"
										className={"form-control " + (this.state.errors.password2 && "is-invalid")}
										name="password2"
										placeholder="Confirm Password"
										value={this.state.password2}
										onChange={this.onChange}
									/>
									<div className="invalid-feedback">
										{this.state.errors.password2}
									</div>
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

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.error
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));