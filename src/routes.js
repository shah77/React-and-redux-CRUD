import React from 'react';
import App from './components/App';
import Home from './components/home/Home';
import Task from './components/task/Task';
import About from './components/about/About';
import AddTask from './components/task/AddTask';
import ErrorPage from './components/common/ErrorPage';
import EditTask from './components/task/EditTask';
import { Route, IndexRoute } from 'react-router';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="task" component={Task}/>
        <Route path="addTask" component={AddTask}/>
        <Route path="about" component={About}/>
        <Route path="editTask/:id" component={EditTask}/>
        <Route path="*" component={ErrorPage}/>
    </Route>
);