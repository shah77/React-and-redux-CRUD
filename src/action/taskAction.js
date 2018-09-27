import * as types from './actionTypes';
import taskApi from '../api/taskApi';

export function loadTaskSuccess(tasks){
    return {type: types.LOAD_TASK_SUCCESS, tasks}
}

export function createTaskSuccess(task){
    return  {type: types.CREATE_TASK_SUCCESS, task};
}

export function updateTaskSuccess(task){
    return  {type: types.UPDATE_TASK_SUCCESS, task};
}

export function deleteTaskSuccess(task){
    return {type: types.DELETE_TASK_SUCCESS, task}
}

export function loadTask(){
    return function(dispatch){
        // dispatch(beginAjaxCall());

        return taskApi.getAllTasks().then(tasks => {
            dispatch(loadTaskSuccess(tasks));
        }).catch(error => {
            throw(error);
        });     
    };
}

export function saveTask(task){
    return function(dispatch, getState){
        // dispatch(beginAjaxCall());

        return taskApi.saveTask(task).then(savedTask => {
            task.id ? dispatch(updateTaskSuccess(savedTask)) : 
            dispatch(createTaskSuccess(savedTask));
        }).catch(error => {
            // dispatch(ajaxCallError());
            throw(error);
        });     
    };
}

export function deleteTask(taskId){
    return function(dispatch) {
        return taskApi.deleteTask(taskId).then(() => {
          dispatch(deleteTaskSuccess(taskId));
          return;
        }).catch(error => {
          throw(error);
        })
    };
}