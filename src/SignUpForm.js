import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'SignUpForm.css';

/** This component is used to gather form data that allow users to register a new account */

const SignUpForm = ({ signUp }) => {

    /** The signUp prop contains a function that passes a function specified in the App component using data from the form. If the result of the 
     *  function is successful, a new user will be registered in the database on the backend, a new token will be generated, the 'token' state 
     *  will be set to the new token, and the 'currentUser' state will be set to the username from the form data. The component will also redirect
     *  users back to the home page upon form submission.
     */

    const initialState = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState)
    
    const handleChange = () => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = () => {
        e.preventDefault();
        signUp(formData);
        setFormData(initialState);
        navigate('/');
    }
    
    return (
        <div>
            <h2>Sign Up</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange}></input>
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" name="password" value={formData.password} onChange={handleChange}></input>
                    <label htmlFor="firstName">First name</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}></input>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}></input>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" value={formData.email} onChange={handleChange}></input>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;