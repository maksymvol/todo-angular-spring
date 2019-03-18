import {Component, OnInit} from '@angular/core';
import {TasksServiceService} from '../tasks-service.service';

@Component({
  selector: 'app-lists-list',
  templateUrl: './lists-list.component.html',
  styleUrls: ['./lists-list.component.css']
})
export class ListsListComponent implements OnInit {

  inputValue = '';

  constructor(private tasksService: TasksServiceService) {
  }

  ngOnInit() {
  }

  addNewList() {
    if (this.inputValue === '') {
      alert('Please type new list name before adding it');
    } else {
      this.tasksService.addNewList(this.inputValue);
      this.inputValue = '';
    }
  }

  changeCurrentList(index) {
    this.tasksService.changeCurrentList(index);
  }

  onInputKeydown(event) {
    if (event.key === 'Enter') {
      this.addNewList();
    } else if (event.key === 'Escape') {
      this.inputValue = '';
    }
  }
}
