import React from 'react';
import {Link,IndexLink} from 'react-router';

const Header = () =>{
    return(
        <div className="header">
            <div className="header-right">
                <IndexLink to="/" activeClassName="active">Home</IndexLink>
                <Link to="/task" activeClassName="active">Task</Link>
                <Link to="/about" activeClassName="active">About</Link>
            </div>
        </div>
    );
}

export default Header;