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
  @Output() deleteTask = new EventEmitter();
  @Output() taskClicked = new EventEmitter();
  @Output() changeTaskName = new EventEmitter();

  constructor(private tasksService: TasksServiceService) {
  }

  ngOnInit() {
  }

  deleteTaskClicked() {
    this.deleteTask.emit(this.index);
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
    this.changeTaskName.emit({name: this.inputValue, index: this.index});
  }

  taskClickedHandle() {
    this.taskClicked.emit(this.index);
  }

  onInputKeydown(event) {
    if (event.key === 'Enter') {
      this.saveEditChanges();
    } else if (event.key === 'Escape') {
      this.cancelEditChanges();
    }
  }
}
