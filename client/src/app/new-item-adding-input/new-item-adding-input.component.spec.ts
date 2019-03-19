import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemAddingInputComponent } from './new-item-adding-input.component';

describe('NewItemAddingInputComponent', () => {
  let component: NewItemAddingInputComponent;
  let fixture: ComponentFixture<NewItemAddingInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewItemAddingInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemAddingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
