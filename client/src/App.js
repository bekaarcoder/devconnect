import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authAction';
import {Provider} from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-learning/AddExperience';
import AddEducation from './components/add-learning/AddEducation';
import Profiles from './components/developers/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import {logoutUser} from './actions/authAction';
import {clearProfile} from './actions/profileAction';
import './App.css';


// check for token
if(localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.setAuthToken);
  // decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearProfile());
    window.location.href('/login');
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route path="/" component = { Landing } exact /> 
            <div className="container">
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profiles" component={Profiles} />
              <Route path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute path="/add-education" component={AddEducation} />
              </Switch>
              <Switch>
                <PrivateRoute path="/posts" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute path="/post/:post_id" component={Post} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
