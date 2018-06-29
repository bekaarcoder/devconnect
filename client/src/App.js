import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
