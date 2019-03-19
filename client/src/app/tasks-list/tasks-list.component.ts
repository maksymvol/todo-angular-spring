import {Component, OnInit, ViewChild} from '@angular/core';
import {TasksServiceService} from '../tasks-service.service';
import {NewItemAddingInputComponent} from '../new-item-adding-input/new-item-adding-input.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  @ViewChild(NewItemAddingInputComponent) inputChild: NewItemAddingInputComponent;

  private placeholder = 'There would be your task...';
  inputValue = '';

  constructor(private tasksService: TasksServiceService) {
  }

  addNewTask() {
    const value = this.inputChild.inputValue;
    if (value === '') {
      alert('Please type your task before adding it');
    } else if (value.length >= 70) {
      alert('Ops! This name is very long - max: 70 symbols');
    } else {
      this.tasksService.addNewTask(value);
      this.inputChild.inputValue = '';
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
      this.inputChild.inputValue = '';
    }
  }

  ngOnInit() {
  }

  handleTaskClicked(task) {
    this.tasksService.toggleTaskChecked(task);
  }

  handleDeleteTask(task) {
    this.tasksService.deleteTask(task);
  }

  handleChangeTaskName(obj) {
    this.tasksService.changeTaskName(obj.name, obj.task);
  }
}
