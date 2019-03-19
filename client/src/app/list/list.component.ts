import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TasksServiceService} from '../tasks-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list: any;
  @Output() deleteList = new EventEmitter();

  constructor(private tasksService: TasksServiceService) {
  }

  ngOnInit() {
  }

  deleteListClicked() {
    this.deleteList.emit(this.list.id);
  }
}
