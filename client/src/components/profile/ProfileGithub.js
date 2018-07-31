import React, { Component } from 'react'
import isEmpty from '../../validations/is-empty';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor() {
    super();
    this.state = {
      clientID: '262f55a5a559aca1bb85',
      clientSecret: 'efc8e9dba8fae3bfde982f6ef8937d9aaae202cf',
      count: 5,
      sort: 'created: asc',
      repos: []
    }
  }

  componentDidMount() {
    const {github} = this.props.profile;
    console.log()
    const {count, sort, clientID, clientSecret} = this.state;

    fetch(`https://api.github.com/users/${github}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          repos: data
        })
      })
      .catch(err => console.log(err));
  }


  render() {
    const {profile} = this.props;
    const {repos} = this.state;
    let content;
    if(isEmpty(profile.github)) {
      content = (
        <p className="lead">No Github profile added yet.</p>
      );
    } else {
      content = (
        <ul className="list-group">
          {repos.map(repo => (
            <li className="list-group-item d-flex justify-content-between">
              <span>
                <h3 className="lead">
                  <a href={repo.html_url} className="text-info" target="_blank">{repo.name}</a>
                </h3>
                <p className="text-muted">{repo.description}</p>
              </span>
              <span>
                <span className="badge badge-primary badge-pill mr-2">{repo.forks_count} forks</span>
                <span className="badge badge-success badge-pill mr-2">{repo.stargazers_count} stars</span>
                <span className="badge badge-warning badge-pill">{repo.watchers_count} watchers</span>
              </span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h3>Latest Github Repositories</h3>
              {content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfileGithub.propTypes = {
  profile: PropTypes.string.isRequired
}

export default ProfileGithub;
