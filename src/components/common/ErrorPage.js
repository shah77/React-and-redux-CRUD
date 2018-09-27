import React from 'react';
import {Link} from 'react-router';

const ErrorPage = () =>{
    return(
        <div className="container">
            <div className='c'>
                <div className='_404'>404</div>
                <hr/>
                <div className='_1'>THE PAGE</div>
                <div className='_2'>WAS NOT FOUND</div>
                <Link to="" className='btn-1'>BACK TO HOME</Link>
            </div>
        </div>
    );
}

export default ErrorPage;