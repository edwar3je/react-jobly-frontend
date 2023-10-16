import React, { useState, useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import NavBar from 'NavBar';
import Home from 'Home';
import SignUpForm from 'SignUpForm';
import LoginForm from 'LoginForm';
import Companies from 'Companies';
import Company from 'Company';
import Jobs from 'Jobs';
import Profile from 'Profile';
import NotFound from 'NotFound';
import JoblyApi from 'api';
import './App.css';

function App() {

  const initialState = "";
  const navigate = useNavigate();

  /** The component will be responsible for handling two states: 'currentUser' and 'token'. 'currentUser' holds information on the user, while 'token' holds information
   *  on the JWT token generated for the user.
   */

  const [currentUser, setCurrentUser] = useState(initialState);
  const [token, setToken] = useState(initialState);

  /** This function is used when the sign-up/register form is submitted. Upon submission, the 'signupUser' static method from the JoblyApi class is called and uses the form
   *  data to generate a new token. Afterwards, the 'token' state is then set to the result of the static method, and the 'currentUser' state is set to the username within the 
   *  form data submitted. The username must be initially placed within the 'currentUser' state to allow useEffect to call upon a static method that requires the username as an 
   *  endpoint to access further information on the user from the backend. As a bonus, the token is also stored in localStorage.
   */

  const signUp = async (data) => {
    let newToken = await JoblyApi.signupUser(data);
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setCurrentUser(data.username);
  };

  /** This function is used when the login form is submitted. Upon submission, the 'loginUser' static method from the JoblyApi class is called and uses the form data to generate a
   *  new token. Afterwards, the 'token' state is then set to the result of the static method, and the 'currentUser' state is set to the username within the form data submitted. 
   *  The username must be initially placed within the 'currentUser' state to allow useEffect to call upon a static method that requires the username as an endpoint to access
   *  further information on the user from the backend. As a bonus, the token is also stored in localStorage.
   */

  const logIn = async (data) => {
    let newToken = await JoblyApi.loginUser(data);
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setCurrentUser(data.username);
  };

  /** This function is used when the user clicks on a log-out button featured in the navbar. Upon click, both the 'token' and 'currentUser' states are set back to their initial
   *  values, and the user is redirected to the home page. As a bonus, information pertaining to 'currentUser' and 'token' are removed from localStorage.
   */

  const signOut = e => {
    e.preventDefault();
    setToken(initialState);
    setCurrentUser(initialState);
    localStorage.setItem('currentUser', null);
    localStorage.setItem('token', null);
    JoblyApi.signOut();
    return navigate('/');
  };

  /** A function that adjusts the state of 'currentUser' and 'token' if both 'currentUser' and 'token' have values in local storage, but contain no values in their respective states. 
   *  This ensures the user stays logged in even if they refresh the page.
  */

  const isAlreadyLoggedIn = () => {
    if(localStorage.getItem('currentUser') && !currentUser){
      const loggedInUser = localStorage.getItem('currentUser');
      const loggedInToken = localStorage.getItem('token');
      setCurrentUser(loggedInUser);
      setToken(loggedInToken);
      JoblyApi.updateToken(loggedInToken);
    }
  };

  /** A function that updates a user's profile information on the backend (via JoblyApi static method 'updateUserInfo') and frontend (via 'currentUser' state and localStorage). */

  const updateUser = async (data) => {
    const updatedUser = await JoblyApi.updateUserInfo(data);
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', updatedUser);
  };

  /** A function that allows a user to apply for a job (on the backend) and updates the state of 'currentUser' to reflect change to 'jobs' key. */

  const updateJob = async (username, jobId) => {
    await JoblyApi.applyForJob(username, jobId);
    const updatedUser = await JoblyApi.getUserInfo(currentUser.username);
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', updatedUser);
  };

  /** If a change has been made to the 'token' state, and token is truthy, the 'getUserInfo' static method from the JoblyApi class is called and uses the username within 'currentUser'
   *  to access all the available information on the user from the back-end. Afterwards, the 'currentUser' state is set to the object returned by the static method. To ensure the user
   *  stays logged in, the information from the static method is also placed in localStorage. 
   */

  useEffect(async () => {
    if(token){
      let userData = await JoblyApi.getUserInfo(currentUser);
      localStorage.setItem('currentUser', userData);
      return setCurrentUser(userData);
    }
  }, [token]);

  isAlreadyLoggedIn();

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar user={currentUser} signOut={signOut}/>
        <main>
          <Switch>
            <Route exact path="/">
              <Home user={currentUser} />
            </Route>
            <Route exact path="/sign-up">
              <SignUpForm signUp={signUp} />
            </Route>
            <Route exact path="/login">
              <LoginForm logIn={logIn} />
            </Route>
            <Route exact path="/companies">
              <Companies />
            </Route>
            <Route path="/companies/:handle">
              <Company user={currentUser} apply={updateJob} />
            </Route>
            <Route exact path="/jobs">
              <Jobs user={currentUser} apply={updateJob} />
            </Route>
            <Route exact path="/profile">
              <Profile user={currentUser} updateUser={updateUser} />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
