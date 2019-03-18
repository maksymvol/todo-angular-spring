import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListsPreviewComponent} from './lists-preview/lists-preview.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CurrentListComponent} from './current-list/current-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'lists', pathMatch: 'full' },
  {path: 'lists', component: ListsPreviewComponent},
  {path: 'lists/:id', component:CurrentListComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
