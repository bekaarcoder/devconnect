import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

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
	}

	render() {
		return (
			<div>
				<h2 className="text-center mt-3">Create Your Profile</h2>
				<p className="lead text-center text-muted">Let's add some information to make your profile stand out.</p>
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

export default connect(
	mapStateToProps
)(CreateProfile)
