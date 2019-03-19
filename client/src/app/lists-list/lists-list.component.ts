import {Component, OnInit, ViewChild} from '@angular/core';
import {TasksServiceService} from '../tasks-service.service';
import {NewItemAddingInputComponent} from '../new-item-adding-input/new-item-adding-input.component';

@Component({
  selector: 'app-lists-list',
  templateUrl: './lists-list.component.html',
  styleUrls: ['./lists-list.component.css']
})
export class ListsListComponent implements OnInit {
  @ViewChild(NewItemAddingInputComponent) inputChild: NewItemAddingInputComponent;
  private placeholder = 'Title';

  constructor(private tasksService: TasksServiceService) {
  }

  ngOnInit() {
  }

  addNewList() {
    const value = this.inputChild.inputValue;
    if (value === '') {
      alert('Please type new list name before adding it');
    } else if (value.length > 27) {
      alert('Ops! This name is very long - max: 27 symbols');
    } else {
      this.tasksService.addNewList(value);
      this.inputChild.inputValue = '';
    }
  }

  changeCurrentList(list) {
    this.tasksService.changeCurrentList(list);
  }

  onInputKeydown(event) {
    if (event.key === 'Enter') {
      this.addNewList();
    } else if (event.key === 'Escape') {
      this.inputChild.inputValue = '';
    }
  }

  deleteList(list) {
    this.tasksService.deleteList(list);
  }
}
