import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'LoginForm.css';

/** This component is used to gather form data that allows the user to log into their existing account. */

const LoginForm = ({ logIn }) => {

    /** The logIn prop contains a function that passes a function specified in the App component using data from the form. If the result of the 
     *  function is successful, it will generate a new token, the 'token' state will be set to the new token, and the 'currentUser' state will
     *  be set to the username from the form data. The component will also redirect users back to the home page upon form submission.
     */
    
    const initialState = {
        username: "",
        password: ""
    };

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);

    const handleChange = e => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        logIn(formData);
        setFormData(initialState);
        navigate('/');
    }

    return (
        <div>
            <h2>Log In</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={formData.name} id="username" onChange={handleChange}></input>
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" value={formData.password} id="password" onChange={handleChange}></input>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;