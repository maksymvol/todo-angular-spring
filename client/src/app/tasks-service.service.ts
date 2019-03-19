import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Task} from './Task';
import {List} from './List';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {

  currentListId = 0;
  tasks: Task[] = [new Task(0, 'name', -1, false)];
  lists: List[] = [new List(0, 'name', false)];

  ROOT_URL = 'http://localhost:4001';

  constructor(private http: HttpClient, private router: Router) {
    this.getTasksFromDB().subscribe(data => this.tasks = data);
    this.getListsFromDB().subscribe(data => this.lists = data, (e) => {},
      () => this.changeCurrentListIdByName(this.router.url.split('/')[2]));
  }

  // SERVER HANDLERS
  getTasksFromDB(): Observable<Task[]> {
    return this.http.get<Task[]>(this.ROOT_URL + '/tasks');
  }

  getListsFromDB(): Observable<List[]> {
    return this.http.get<List[]>(this.ROOT_URL + '/lists');
  }

  deleteDataFromDB(targetList: string, id) {
    return this.http.delete(this.ROOT_URL + '/' + targetList + '/' + id);
  }

  postDataToDB(newData: any, target: string) {
    return this.http.post(this.ROOT_URL + '/' + target, newData);
  }

  makePatchToDB(target, id, data) {
    return this.http.patch(this.ROOT_URL + '/' + target + '/' + id, data);
  }

  // TASKS
  getTasksInList(id, amount: number, checked: boolean) {
    return this.tasks.filter(task => task.list === id)
      .filter(task => task.checked === checked)
      .slice(0, amount);
  }

  addNewTask(name) {
    let newId = -1;
    for (const task of this.tasks) {
      if (task.id > newId) {
        newId = task.id;
      }
    }
    newId++;
    const task = new Task(newId, name, this.currentListId, false);

    this.postDataToDB(task, 'tasks').subscribe((data: List) => console.log(data), (e) => {},
      () => {this.getTasksFromDB().subscribe(data => this.tasks = data); });
  }

  deleteTask(task) {
    this.deleteDataFromDB('tasks', task.id).subscribe((data: Task) => {console.log(data); }, (e) => {console.log(e); },
      () => {this.getTasksFromDB().subscribe(data => this.tasks = data); });
  }

  toggleTaskChecked(task) {
    task.checked = !task.checked;
    this.makePatchToDB('tasks', task.id, task).subscribe((data: Task) => console.log(data),
      (error) => {console.log(error); },
      () => {this.getTasksFromDB().subscribe(data => this.tasks = data); });
  }

  changeTaskName(name, task) {
    task.name = name;
    this.makePatchToDB('tasks', task.id, task).subscribe((data: Task) => console.log(data),
      (error) => {console.log(error); },
      () => {this.getTasksFromDB().subscribe(data => this.tasks = data); });
  }
  // LISTS
  addNewList(listName) {
    let newId = -1;
    for (const list of this.lists) {
      if (list.id > newId) {
        newId = list.id;
      }
    }
    newId++;

    const newList = new List(newId, listName, false);

    this.postDataToDB(newList, 'lists').subscribe((data: List) => {console.log(data); }, (error) => {console.log(error); },
      () => this.getTasksFromDB().subscribe(data => {this.tasks = data; }, (error) => {console.log(error); },
        () => {this.getListsFromDB().subscribe(data => this.lists = data, (e) => {},
          () => {this.changeCurrentList(newList); }); }));
  }

  deleteList(list) {

    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].list === list.id) {
        this.deleteDataFromDB('tasks', this.tasks[i].id).subscribe((data: Task) => {console.log(data); });
      }
    }
    this.deleteDataFromDB('lists', list.id).subscribe((data: List) => {console.log(data); }, (error) => {console.log(error)},
      () => this.getTasksFromDB().subscribe(data => {this.tasks = data; }, (error) => {console.log(error); },
        () => {this.getListsFromDB().subscribe(data => this.lists = data); }));
    this.changeCurrentList(list);
  }

  changeCurrentList(list: List) {
    this.router.navigateByUrl('/lists/' + list.name);
    this.currentListId = list.id;
  }

  pinList(list: List) {
    list.pinned = !list.pinned;
    this.makePatchToDB('lists', list.id, list).subscribe((data: Task) => console.log(data),
      (error) => {console.log(error); },
      () => {this.getListsFromDB().subscribe(data => this.lists = data); });
  }

  navigateToList(list: List) {
    this.router.navigateByUrl('/lists/' + list.name);
    this.changeCurrentList(list);
  }

  navigateToPreview() {
    this.router.navigateByUrl('/lists');
  }
  getListSortedByPin() {
    return this.lists.sort(function(x, y) {return (x.pinned === y.pinned) ? 0 : x.pinned ? -1 : 1; });
  }

  changeCurrentListIdByName(name) {
    for (let list of this.lists) {
      if (list.name === name) {
        this.changeCurrentList(list);
        break;
      }
    }
  }

  getTasksSortedById() {
    return this.tasks.sort((x, y) => {return x.id - y.id; });
  }

  getListsSortedById() {
      return this.lists.sort((x, y) => {return x.id - y.id; });
  }

  private getIndexById(target, id: number) {
    return target.findIndex(list => list.id === id);
  }

  getListById(id: number) {
    for (let list of this.lists) {
      if (list.id === id) {
        return list;
      }
    }
  }
}
