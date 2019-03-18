import {Component, OnInit} from '@angular/core';
import {TasksServiceService} from '../tasks-service.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  inputValue = '';

  constructor(private tasksService: TasksServiceService) {
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

  ngOnInit() {
  }

}
