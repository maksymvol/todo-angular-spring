import {Component, OnInit} from '@angular/core';
import {TasksServiceService} from '../tasks-service.service';
import {List} from '../List';

@Component({
  selector: 'app-lists-preview',
  templateUrl: './lists-preview.component.html',
  styleUrls: ['./lists-preview.component.css']
})
export class ListsPreviewComponent implements OnInit {
  constructor(private tasksService: TasksServiceService) {
  }

  ngOnInit() {
  }

  cardClicked(id) {
    const index = this.tasksService.lists.findIndex(list => list.id === id);
    const list = this.tasksService.lists[index];
    this.tasksService.navigateToList(list);
  }

  pinList(id: number) {
    this.tasksService.pinList(this.tasksService.getListById(id));
  }
}
