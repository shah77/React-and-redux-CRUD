import React from 'react';

class About extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <br/><br/>
                <div className="jumbotron">
                <h3 className="title">About</h3>
                    <p>This is about page</p>
                </div>
            </div>
        );
    }
}

export default About;