import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {browserHistory} from 'react-router';
import * as taskAction from '../../action/taskAction';
import toastr from 'toastr';

class AddTask extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            task:Object.assign({}, this.props.task),
            saving: false
        };

        this.saveTask = this.saveTask.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps){ 
        if(this.props.task.id != nextProps.task.id){
            //necessary to populate form when existing course id loaded
            this.setState({task:Object.assign({}, nextProps.task)});
        }
    }

    saveTask(event){
        event.preventDefault();
        console.log("click click");
        this.setState({saving:true});
        this.props.actions.saveTask(this.state.task)
            .then(() => this.redirect()).catch(error => {
                toastr.error(error);
                this.setState({saving:false});
            }
        ); 
    }

    redirect(){
        toastr.success('Course saved');
        browserHistory.push('task');
    }

    onChange(event){
        const field = event.target.name;
        let task = this.state.task;
        task[field] = event.target.value;
        return this.setState({task: task})
    }

    render(){
        return(
            <div>
                <br/><br/>
                <h3>New Task</h3>
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
                    >
                    <option disabled>Select team</option>
                    <option value="Team A">Team A</option>
                    <option value="Team B">Team B</option>
                    <option value="Team C">Team C</option>
                    </select>
                </div>

                <input 
                type="submit" 
                onClick={this.saveTask} 
                className="btn btn-create"
                disabled={this.state.saving}
                value={this.state.saving ? 'Saving...':'Create'}/>
                </form>
            </div>
        )
    }
}

AddTask.propTypes = {
    task:PropTypes.object.isRequired
};

function mapStateToProps(state, ownProp){
    let task = {id: '', title: '', startDate: '', endDate: '', assignedTo: ''};

    return{
        task:task
    };
}

function mapDispatchToProps(dispatch){
    return{
        actions: bindActionCreators(taskAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);