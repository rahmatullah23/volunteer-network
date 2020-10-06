import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from './components/Login/Login';
import Register from './components/Register/Registr';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Event from './components/Event/Event';
import Volunteer from './components/Volunteer/Volunteer';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div className="container">
    <UserContext.Provider  value={[loggedInUser, setLoggedInUser]}>
      <Router>
          <Switch>
            <Route path="/home">
              <Volunteer />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/event">
              <Event />
            </Route>
            <PrivateRoute path="/registr">
              <Register />
            </PrivateRoute>
            <Route exact path="/">
              <Volunteer />
            </Route>
          </Switch>
      </Router>
    </UserContext.Provider>
    </div>
  );
}

export default App;
