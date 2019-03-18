import {Component, OnInit} from '@angular/core';
import {TasksServiceService} from '../tasks-service.service';
import {TaskService} from '../shared/task/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  inputValue = '';
  private tasks: Array<any>;

  constructor(private tasksService: TasksServiceService, private taskService: TaskService) {
  }

  ngOnInit() {
    this.taskService.getAll().subscribe(data => {
      this.tasks = data;
    });
  }

  addNewTask() {
    if (this.inputValue === '') {
      alert('Please type your task before adding it');
    } else {
      this.tasksService.addNewTask(this.inputValue);
      this.inputValue = '';
    }
  }

  isAnyTasksInCurrentList() {
    for (const task of this.tasksService.tasks) {
      if (task.list === this.tasksService.currentListId) {
        return true;
      }
    }
    return false;
  }

  onInputKeydown(event) {
    if (event.key === 'Enter') {
      this.addNewTask();
    }
  }
}
