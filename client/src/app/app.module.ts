import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {TasksListComponent} from './tasks-list/tasks-list.component';
import {TaskComponent} from './task/task.component';
import {ListsListComponent} from './lists-list/lists-list.component';
import {ListComponent} from './list/list.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ListsPreviewComponent} from './lists-preview/lists-preview.component';
import {AppRoutingModule} from './app-routing.module';
import {CurrentListComponent} from './current-list/current-list.component';
import {NewItemAddingInputComponent} from './new-item-adding-input/new-item-adding-input.component';
import { ListCardComponent } from './list-card/list-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TaskComponent,
    ListsListComponent,
    ListComponent,
    PageNotFoundComponent,
    ListsPreviewComponent,
    CurrentListComponent,
    NewItemAddingInputComponent,
    ListCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
