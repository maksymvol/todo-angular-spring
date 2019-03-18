import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TasksServiceService} from '../tasks-service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  isEditing = false;
  inputValue = '';

  @Input() task: any;
  @Input() index: number;
  @Output() deleteTaskHandle = new EventEmitter();

  constructor(private tasksService: TasksServiceService) {
  }

  ngOnInit() {
  }

  deleteTaskClicked() {
    this.tasksService.deleteTask(this.index);
  }

  editTaskClicked() {
    this.inputValue = this.task.name;
    this.isEditing = true;
  }

  cancelEditChanges() {
    this.isEditing = false;
  }

  saveEditChanges() {
    this.isEditing = false;
    this.tasksService.changeTaskName(this.inputValue, this.index);
  }

  taskClicked() {
    this.tasksService.toggleTaskChecked(this.index);
  }

  onInputKeydown(event) {
    if (event.key === 'Enter') {
      this.saveEditChanges();
    } else if (event.key === 'Escape') {
      this.cancelEditChanges();
    }
  }
}
