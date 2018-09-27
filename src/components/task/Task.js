import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {Link} from 'react-router';
import * as taskAction from '../../action/taskAction';
import toastr from 'toastr';

class Task extends React.Component{
    constructor(props){
        super(props);
    }

    redirectToAddCoursePage(){
        console.log("add task");
        browserHistory.push('addTask');
    }

    deleteTask(id){
        this.props.actions.deleteTask(id)
            .then(() => toastr.success('Course deleted')).catch(error => {
                toastr.error(error);
            }
        );
    }

    editTask(){
        browserHistory.push('editTask')
    }

    render(){
        return(
            <div>
                <br/><br/>
                <input 
                    type="submit"
                    value="Add Course"
                    className="btn btn-create"
                    onClick={this.redirectToAddCoursePage}/>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>No.</th>
                            <th>Task</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Assign to</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.tasks.map((b, i) =>  
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{b.title}</td>
                            <td>{b.startDate}</td>
                            <td>{b.endDate}</td>
                            <td>{b.assignedTo}</td>
                            <td>
                                <Link to={'/editTask/'+b.id}><button className="btn-edit">
                                    <i className="fa fa-edit"></i>
                                </button></Link>
                                &nbsp;
                                <button className="btn-delete" onClick={this.deleteTask.bind(this, b.id)}>
                                <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        tasks: state.tasks
    };
}
  
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(taskAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (Task);