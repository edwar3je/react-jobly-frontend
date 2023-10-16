import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'Companies.css';
import SearchForm from 'SearchForm';
import CompanyCard from 'CompanyCard';
import JoblyApi from 'api';

/** Renders a list of all available companies */

const Companies = () => {
    
    const initialState = [];
    const [companies, setCompanies] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    /** Upon first render of the component, the 'getAllCompanies' static method from the JoblyApi class will be used to obtain information on 
     *  all companies in the database. Afterwards, the 'companies' state will be set to reflect the data from the static method, and 'isLoading'
     *  will be set to 'false' to render the information. 
    */

    useEffect(async () => {
        const allCompanies = await JoblyApi.getAllCompanies();
        setCompanies(allCompanies);
        setIsLoading(false);
    }, []);

    /** A function passed as a prop to the 'SearchForm' component that changes state based on information obtained using two static methods
     *  from the JoblyApi class. If the string entered is empty, the 'companies' state will be changed to display all available companies.
     *  If the string isn't empty, the 'getCompaniesFilter' method will be used to obtain all available companies matching the string, and
     *  the 'companies' state will be changed to that result. 
     */

    const lookupCompanies = async (string) => {
        if(string !== ""){
            const filterCompanies = await JoblyApi.getCompaniesFilter(string);
            setCompanies(filterCompanies);
        } else {
            const allCompanies = await JoblyApi.getAllCompanies();
            setCompanies(allCompanies);
        }
    }

    /** Creates the list of company cards using the 'companies' state.
     *  If 'companies' is empty, a unique message appears encouraging users to enter another term in the search box.
     */

    const loadCompanies = (array) => {
        if(array.length !== 0){
            return (
                <div>
                    {array.map(({ handle, name, description, numEmployees, logoUrl }) => {
                        return <CompanyCard handle={handle} name={name} description={description} />
                    })}
                </div>
            )
        } else {
            return (
                <h3>Oops, no options available. Try another word.</h3>
            )
        }
    }

    /** If the user isn't signed in, the user will be redirected back to the home page. */

    if(!localStorage.getItem('currentUser')){
        return navigate('/');
    }

    /** If the page is still loading, a unique loading message will appear. Other wise, the full page will appear. */

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div>
            <SearchForm lookup={lookupCompanies} />
            {loadCompanies(companies)}
        </div>
    );
};

export default Companies;