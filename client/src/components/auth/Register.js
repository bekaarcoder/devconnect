import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

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
		const {errors} = this.state
		return (
			<div className="row justify-content-center">
				<div className="col-md-6">
					<h2 className="text-center mt-5">Sign Up</h2>
					<p className="text-center lead">Create your DevConnect account.</p>
					<div className="card">
						<div className="card-body">
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									type="text"
									name="name"
									placeholder="Name"
									value={this.state.name}
									onChange={this.onChange}
									autoComplete="nope"
									error={errors.name}
								/>
								<TextFieldGroup
									type="text"
									name="email"
									placeholder="Email Address"
									value={this.state.email}
									onChange={this.onChange}
									autoComplete="nope"
									error={errors.email}
									info="Use a gravatar email if you want a profile image."
								/>
								<TextFieldGroup
									type="password"
									name="password"
									placeholder="Password"
									value={this.state.password}
									onChange={this.onChange}
									autoComplete="nope"
									error={errors.password}
									info="Password must be atleast 6 characters"
								/>
								<TextFieldGroup
									type="password"
									name="password2"
									placeholder="Confirm Password"
									value={this.state.password2}
									onChange={this.onChange}
									autoComplete="nope"
									error={errors.password2}
								/>
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