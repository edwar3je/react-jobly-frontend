import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'Profile.css';

/** This component will display a form that allows users to adjust their profile information (sans their username). */

const Profile = ({ user, updateUser }) => {

    const [formData, setFormData] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    /** Upon any change made to the 'user' prop (stand in for 'currentUser' state), the form data will be set to information from the 'user' prop. 
     *  Since the 'user' prop will only change based off changes made to the input fields, this allows users to update their profile by only
     *  adjusting fields they would like to change.
     */

    useEffect(() => {
        setFormData(user);
        setIsLoading(false);
    }, [user]);

    const handleChange = e => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await updateUser(formData);
        navigate('/');
    }

    if(!localStorage.getItem('currentUser')){
        return navigate('/');
    };

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        );
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={user.username}></input>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}></input>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}></input>
                <button>Save Changes</button>
            </form>
        </div>
    );
};

export default Profile;