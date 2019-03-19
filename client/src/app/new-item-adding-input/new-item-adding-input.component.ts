import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-new-item-adding-input',
    templateUrl: './new-item-adding-input.component.html',
    styleUrls: ['./new-item-adding-input.component.css']
})
export class NewItemAddingInputComponent implements OnInit {
    inputValue;
    @Input() placeholder;
    @Output() onInputKeydown = new EventEmitter();
    @Output() spanClick = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    onInputKeydownHandler(e) {
        this.onInputKeydown.emit(e);
    }

    addNewTaskHandler() {
        this.spanClick.emit();
    }
}
