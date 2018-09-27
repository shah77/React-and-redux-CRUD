import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {browserHistory} from 'react-router';
import * as taskAction from '../../action/taskAction';
import toastr from 'toastr';

class EditTask extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            task:Object.assign({}, this.props.task),
            saving:false
        };

        this.updateTask = this.updateTask.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps){ 
        if(this.props.task.id != nextProps.task.id){
            //necessary to populate form when existing course id loaded
            this.setState({task:Object.assign({}, nextProps.task)});
        }
    }

    updateTask(event){
        event.preventDefault();
        this.setState({saving: true});
        this.props.actions.saveTask(this.state.task)
            .then(() => this.redirect()).catch(error => {
                this.setState({saving:false});
                toastr.error(error);
            }
        ); 
    }

    redirect(){
        toastr.success('Course updated');
        browserHistory.push('/task');
    }

    onChange(event){
        const field = event.target.name;
        let task = this.state.task;
        task[field] = event.target.value;
        return this.setState({task: task});
    }

    render(){
        return(
            <div>
                <br/><br/>
                <h3>Update Task</h3>
                <form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Task name</label>
                    <input type="text" 
                    className="form-control"
                    name="title" 
                    id="exampleFormControlInput1" 
                    placeholder="Task name"
                    value={this.state.task.title}
                    onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Start date</label>
                    <input type="date" 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder="Start date"
                    name="startDate"
                    value={this.state.task.startDate}
                    onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">End date</label>
                    <input type="date" 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder="End date"
                    name="endDate"
                    value={this.state.task.endDate}
                    onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Assign to</label>
                    <select className="form-control" 
                    id="exampleFormControlSelect1"
                    name="assignedTo"
                    onChange={this.onChange}
                    value={this.state.task.assignedTo}>
                        <option disabled>Select team</option>
                        <option value="Team A">Team A</option>
                        <option value="Team B">Team B</option>
                        <option value="Team C">Team C</option>
                    </select>
                </div>

                <input 
                type="submit" 
                onClick={this.updateTask} 
                className="btn btn-create"
                disabled={this.state.saving}
                value={this.state.saving ? 'Updating...' : 'Update'}/>
                </form>
            </div>
        );
    }
}

EditTask.propTypes = {
    task:PropTypes.object.isRequired
};

function getCourseById(tasks, id){
    const task = tasks.filter(course => course.id == id);
    if(task) return task[0];
    return null;
}

function mapStateToProps(state, ownProps){
    const taskId = ownProps.params.id;
    let task = {id: '', title: '', startDate: '', endDate: '', assignedTo: ''};

    if(taskId){
        task = getCourseById(state.tasks, taskId);
    }

    return{
        task:task
    };
}

function mapDispatchToProps(dispatch){
    return{
        actions: bindActionCreators(taskAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);