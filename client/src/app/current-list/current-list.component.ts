import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TasksServiceService} from '../tasks-service.service';

@Component({
  selector: 'app-current-list',
  templateUrl: './current-list.component.html',
  styleUrls: ['./current-list.component.css']
})
export class CurrentListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private tasksService: TasksServiceService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tasksService.changeCurrentListIdByName(params['id']);
    });
  }

  previewClicked() {
    this.tasksService.navigateToPreview();
  }
}
