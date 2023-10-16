import React from 'react';
import 'NavBar.css';
import { NavLink } from 'react-router-dom';

/** This component functions as the navbar across all major components within the React app. The layout of the navbar will differ
 *  depending on the current 'user' prop value. The navbar also contains a 'signOut' prop which contains a function that signs the
 *  current user out of their account and redirects them to the home page. 
 */

const NavBar = ({ user, signOut }) => {

    /** If the 'user' prop value is empty, the navbar will only display two links: a sign-up form (allows users to register a new account), 
     *  and a log-in form (allows users to log into an existing account). If the 'user' prop isn't empty, the user can access the following
     *  links: Companies (information on companies), Jobs (information on available jobs), Profile (allows user to view/edit profile info)
     *  and a Sign Out button (signs the user out of their account and redirects them to the home page).
    */
    
    if(!user){
        return (
            <div>
                <nav>
                    <NavLink exact to="/">Jobly</NavLink>
                    <NavLink exact to="/sign-up">Signup</NavLink>
                    <NavLink exact-to="/login">Login</NavLink>
                </nav>
            </div>
        );
    } else {
        return (
            <div>
                <nav>
                    <NavLink exact to="/">Jobly</NavLink>
                    <NavLink exact to="/companies">Companies</NavLink>
                    <NavLink exact to="/jobs">Jobs</NavLink>
                    <NavLink exact to="/profile">Profile</NavLink>
                    <button onClick={signOut}>Sign Out {user}</button>
                </nav>
            </div>
        );
    };
};

export default NavBar;