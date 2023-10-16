import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'Jobs.css';
import SearchForm from 'SearchForm';
import JobCard from 'JobCard';

const Jobs = ({ user, apply }) => {
    
    const [jobs, setJobs] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(async () => {
        const allJobs = await JoblyApi.getAllJobs();
        setJobs(allJobs);
        setIsLoading(false);
    }, []);

    const lookupJobs = async (string) => {
        if(string !== ""){
            const filterJobs = await JoblyApi.getJobsFilter(string);
            setJobs(filterJobs);
        } else {
            const allJobs = await JoblyApi.getAllJobs();
            setJobs(allJobs);
        }
    }

    const loadJobs = (array) => {
        if(array.length !== 0){
            return (
                <div>
                    {array.map(({id, title, salary, equity, companyName}) => {
                        return <JobCard id={id} title={title} salary={salary} equity={equity} company={companyName} user={user} apply={apply} />
                    })}
                </div>
            )
        } else {
            return (
                <h3>Oops, no options available. Try another word.</h3>
            )
        }
    };

    /** If the user isn't logged in, the user will be redirected back to the home page. */

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
            <SearchForm lookup={lookupJobs} />
            {loadJobs(jobs)}
        </div>
    );
};

export default Jobs;