import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {RouterOutlet} from '@angular/router';

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

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TaskComponent,
    ListsListComponent,
    ListComponent,
    PageNotFoundComponent,
    ListsPreviewComponent,
    CurrentListComponent
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
