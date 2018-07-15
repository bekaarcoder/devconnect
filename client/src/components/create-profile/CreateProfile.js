import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {createNewProfile} from '../../actions/profileAction';

class CreateProfile extends Component {

	constructor() {
		super();
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			github: '',
			bio: '',
			facebook: '',
			twitter: '',
			instagram: '',
			linkedin: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.showNetworkFields = this.showNetworkFields.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors){
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const newProfile = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			github: this.state.github,
			bio: this.state.bio,
			facebook: this.state.facebook,
			twitter: this.state.twitter,
			instagram: this.state.instagram,
			linkedin: this.state.linkedin
		};
		console.log(newProfile);
		this.props.createNewProfile(newProfile);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	showNetworkFields() {
		this.setState(prevState => ({
			displaySocialInputs: !prevState.displaySocialInputs
		}));
	}

	render() {
		const {errors, displaySocialInputs} = this.state;

		let socialInputs;
		if(displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						name="facebook"
						placeholder="Facebook Profile URL"
						value={this.state.facebook}
						error={errors.facebook}
						onChange={this.onChange}
						icon="fab fa-facebook"
					/>
					<InputGroup
						name="twitter"
						placeholder="Twitter Profile URL"
						value={this.state.twitter}
						error={errors.twitter}
						onChange={this.onChange}
						icon="fab fa-twitter"
					/>
					<InputGroup
						name="instagram"
						placeholder="Instagram Profile URL"
						value={this.state.instagram}
						error={errors.instagram}
						onChange={this.onChange}
						icon="fab fa-instagram"
					/>
					<InputGroup
						name="linkedin"
						placeholder="Linkedin Profile URL"
						value={this.state.linkedin}
						error={errors.linkedin}
						onChange={this.onChange}
						icon="fab fa-linkedin"
					/>
				</div>
			)
		}

		const options = [
			{label: "* Select Professional Status", value: 0},
			{label: "Developer", value: "Developer"},
			{label: "Junior Developer", value: "Junior Developer"},
			{label: "Senior Developer", value: "Senior Developer"},
			{label: "Manager", value: "Manager"},
			{label: "Student", value: "Student"},
			{label: "Teacher", value: "Teacher"},
			{label: "Instructor", value: "Instructor"},
			{label: "Other", value: "Other"}
		];
		return (
			<div>
				<h2 className="text-center mt-3">Create Your Profile</h2>
				<p className="lead text-center text-muted">Let's add some information to make your profile stand out.</p>
				<div className="row justify-content-center">
					<div className="col-md-8 mt-3">
						<form onSubmit={this.onSubmit}>
							<TextFieldGroup
								name="handle"
								placeholder="* Profile Handle"
								value={this.state.handle}
								onChange={this.onChange}
								error={errors.handle}
								autoComplete="nope"
								info="A unique handle for your profile."
							/>
							<SelectListGroup
								name="status"
								options={options}
								error={errors.status}
								onChange={this.onChange}
								info="Give us an idea about your career status."
							/>
							<TextFieldGroup
								name="company"
								placeholder="Company Name"
								value={this.state.company}
								onChange={this.onChange}
								error={errors.company}
								autoComplete="nope"
								info="Your company name or the company you work for."
							/>
							<TextFieldGroup
								name="website"
								placeholder="Website"
								value={this.state.website}
								onChange={this.onChange}
								error={errors.website}
								autoComplete="nope"
								info="Your website or your company's website"
							/>
							<TextFieldGroup
								name="location"
								placeholder="Location"
								value={this.state.location}
								onChange={this.onChange}
								error={errors.location}
								autoComplete="nope"
								info="City and State, (eg. New Delhi, Delhi)"
							/>
							<TextFieldGroup
								name="skills"
								placeholder="* Skills"
								value={this.state.skills}
								onChange={this.onChange}
								error={errors.skills}
								autoComplete="nope"
								info="Please use comma seperated values (eg. Java, PHP, JavaScript)"
							/>
							<TextareaFieldGroup
								name="bio"
								placeholder="Short Bio"
								value={this.state.bio}
								onChange={this.onChange}
								error={errors.bio}
								autoComplete="nope"
								info="Tell us something about yourself."
							/>
							<TextFieldGroup
								name="github"
								placeholder="Github Profile"
								value={this.state.github}
								onChange={this.onChange}
								error={errors.github}
								autoComplete="nope"
								info="Put the url of your github profile"
							/>
							<div className="mb-3 mt-2">
								<button onClick={this.showNetworkFields} className="btn btn-info btn-sm">Add Social Network Links</button>
								<span className="text-muted small ml-3">Optional</span>
							</div>
							{socialInputs}
							<div className="text-center">
								<input type="submit" className="btn btn-success mb-3" value="Create Profile"/>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.error
});

export default connect(mapStateToProps, {createNewProfile})(CreateProfile);
