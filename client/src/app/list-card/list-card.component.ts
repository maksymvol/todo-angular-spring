import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {List} from '../List';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {

  @Input() list: List;
  @Input() tasks;
  @Output() cardClicked = new EventEmitter();
  @Output() pinList = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleCardClicked() {
    this.cardClicked.emit(this.list.id);
  }

  handlePinList(id: number) {
    this.pinList.emit(id);
  }
}
