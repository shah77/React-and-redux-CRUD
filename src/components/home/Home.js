import React from 'react';

class Home extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <br/><br/>
                <div className="jumbotron">
                <h3 className="title">Home</h3>
                    <p>This is home page</p>
                </div>
            </div>
        );
    }
}

export default Home;