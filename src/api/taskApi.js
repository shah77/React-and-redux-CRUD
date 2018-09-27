import delay from './delay';

const tasks = [
  {
    id: "1",
    title: "Create to do app in React",
    startDate: "2018-09-25",
    endDate: "2018-09-26",
    assignedTo: "Team A"
  },
  {
    id: "2",
    title: "Create to do app in Angular",
    startDate: "2018-09-26",
    endDate: "2018-09-27",
    assignedTo: "Team B"
  },
  {
    id: "3",
    title: "Create to do app in  Vue",
    startDate: "2018-09-26",
    endDate: "2018-09-27",
    assignedTo: "Team C"
  },
  {
    id: "4",
    title: "Create to do app in Node",
    startDate: "2018-09-26",
    endDate: "2018-09-27",
    assignedTo: "Team B"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (task) => {
  return replaceAll(task.title, ' ', '-');
};

class TaskApi {
  static getAllTasks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], tasks));
      }, delay);
    });
  }

  static saveTask(task) {
    task = Object.assign({}, task); 
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        if (task.title.length < 1) {
          reject(`Task name cannot be blank.`);
        }

        if (task.startDate.length == null) {
          reject(`Task start date field cannot be blank.`);
        }

        if (task.endDate.length == null) {
          reject(`Task end date field cannot be blank.`);
        }

        if (task.endDate < task.startDate) {
          reject(`End date must be after start date.`);
        }

        if (task.assignedTo == null) {
          reject(`Please select team.`);
        }

        if (task.id) {
          const existingTaskIndex = tasks.findIndex(a => a.id == task.id);
          tasks.splice(existingTaskIndex, 1, task);
        } else {
          
          task.id = generateId(task);
          tasks.push(task);
        }

        resolve(task);
      }, delay);
    });
  }

  static deleteTask(taskId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfTaskToDelete = tasks.findIndex(task => {
          task.id == taskId;
        });
        tasks.splice(indexOfTaskToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default TaskApi;