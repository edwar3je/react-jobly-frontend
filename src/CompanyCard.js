import React from 'react';
import { Link } from 'react-router-dom';
import 'CompanyCard.css';

/** Renders a card that contains some information on a company (name and description) and acts as a link to a
 *  page containing information on available jobs from the company.
 */

const CompanyCard = ({ handle, name, description }) => {
    
    const path = `/companies/${handle}`
    
    return (
        <div className="company-card-container">
            <Link to={path}>
                <div className="company-card-details">
                    <h3 className="company-card-name">{name}</h3>
                    <p className="company-card-description">{description}</p>
                </div>
            </Link>
        </div>
    );
};

export default CompanyCard;