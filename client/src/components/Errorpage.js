import React from 'react'
import { NavLink } from 'react-router-dom';

const Errorpage = () => {
    return (
        <>
            <div className="notfound">
                <h1>404 Not Found</h1>
            </div>
        <NavLink to='/'>Back to Homepage</NavLink>
        
        </>
    )
}

export default Errorpage;