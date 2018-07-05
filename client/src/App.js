import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authAction';
import {Provider} from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

// check for token
if(localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.setAuthToken);
  // decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
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
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
