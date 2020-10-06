import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../../images/logos/Group 1329.png'
import './Login.css'

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email} 
            setLoggedInUser(signedInUser);
            storeAuthToken();
            // history.replace(from);
            // ...
          }).catch(function(error) {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }
    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
          history.replace(from); // take from little up coz 2time need login, bt now ok
            // console.log(idToken)            ------------[video 49.6 - 9.7time]
            sessionStorage.setItem('token',idToken);
          }).catch(function(error) {
            // Handle error
          });
    }
    return (
        <div className="row">
          <div className="col-md-6 offset-3 ">
          <Link to={"/home"}> <img style={{height:80}} src={logo} alt="" /></Link>
          
          <div className="block-example" >
            <h1>Log in with</h1>
            <button className="button-margin" onClick={handleGoogleSignIn}>Continue with Google</button>
            <p>Don't have an account?Create an account</p>
            </div>
            </div>

        </div>
    );
};

export default Login;