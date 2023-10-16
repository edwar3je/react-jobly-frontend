import React from 'react';
import 'JobCard.css';

/** Renders a card that contains information on a specific job that can be used for either a general job search,
 *  or to display information on jobs within a given company. The 'company' prop is null by default to allow
 *  developers to include the component on a company-specific page. The 'id' and 'user' props are needed to to 
 *  render the proper button to allow users to apply to a job (if not already applied).
  */

const JobCard = ({ id, title, salary, equity, company=null, user, apply}) => {

    /** Applies user for a job and saves information to both the backend and frontend. */

    const handleApply = async (username, jobId) => {
        await apply(username, jobId);
    };

    /** Renders either a non-clickable or clickable button depending on whether the user has applied for the job
     *  (clickable if hasn't applied, non-clickable if has applied). The function determines if the user has applied
     *  for the job by examining if the jobId can be found within the 'jobs' array found in the 'user' prop.
     */

    const applyButton = (id, user) => {
        for(let job of user.jobs){
            if(job.id === id){
                return (
                    <button>Applied</button>
                )
            }
        };
        return (
            <button onClick={handleApply(id, user.username)}>Apply</button>
        );
    };

    /** If company is null, the company is omitted from the render (otherwise, the company information is rendered). */
    
    if(!company){
        return (
            <div className="job-card-container">
                <div className="job-card-details">
                    <h3 className="job-card-title">{title}</h3>
                    <p className="job-card-other">Salary: {salary}</p>
                    <p className="job-card-other">Equity: {equity}</p>
                </div>
                <div className="apply-button-container">
                    {applyButton(id, user)}
                </div>
            </div>
        );
    };
    
    return (
        <div className="job-card-container">
            <div className="job-card-details">
                <h3 className="job-card-title">{title}</h3>
                <p className="job-card-company">{company}</p>
                <p className="job-card-other">Salary: {salary}</p>
                <p className="job-card-other">Equity: {equity}</p>
            </div>
            <div className="apply-button-container">
                {applyButton(id, user)}
            </div>
        </div>
    );
};

export default JobCard;