import {Component, Input, OnInit} from '@angular/core';
import {TasksServiceService} from '../tasks-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list: any;
  @Input() index: number;

  constructor(private tasksService: TasksServiceService) {
  }

  ngOnInit() {
  }

  deleteListClicked() {
    this.tasksService.deleteList(this.index);
  }
}
