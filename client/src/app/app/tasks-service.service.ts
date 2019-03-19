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

  ROOT_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {
    this.getTasksFromDB().subscribe(data => this.tasks = data);
    this.getListsFromDB().subscribe(data => this.lists = data, (e) => {},
      () => this.changeCurrentListIdByName(this.router.url.split('/')[2]));
  }

  // SERVER HANDLERS
  getTasksFromDB(): Observable<Task[]> {
    return this.http.get(this.ROOT_URL + '/tasks')
      .pipe(map(data => {
        return data.map((task: any) => new Task(task.id, task.name, task.list, task.checked));
      }));
  }

  getListsFromDB(): Observable<List[]> {
    return this.http.get(this.ROOT_URL + '/lists').pipe(map(data => {
      return data.map((list: any) => new List(list.id, list.name, list.pinned));
    }));
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

  deleteTask(index: number) {
    const offset = this.tasks[index].id;
    this.deleteDataFromDB('tasks', offset).subscribe((data: Task) => {console.log(data); }, (e) => {console.log(e); },
      () => {this.getTasksFromDB().subscribe(data => this.tasks = data); });
  }

  toggleTaskChecked(index) {
    const newTask = this.tasks[index];
    newTask.checked = !newTask.checked;
    this.makePatchToDB('tasks', this.tasks[index].id, newTask).subscribe((data: Task) => console.log(data),
      (error) => {console.log(error); },
      () => {this.getTasksFromDB().subscribe(data => this.tasks = data); });
  }

  changeTaskName(name, index) {
    const newTask = this.tasks[index];
    newTask.name = name;
    const offset = newTask.id;
    this.makePatchToDB('tasks', offset, newTask).subscribe((data: Task) => console.log(data),
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

    const newList = {id: newId, name: listName};

    this.postDataToDB(newList, 'lists').subscribe((data: List) => {console.log(data); }, (error) => {console.log(error); },
      () => this.getTasksFromDB().subscribe(data => {this.tasks = data; }, (error) => {console.log(error); },
        () => {this.getListsFromDB().subscribe(data => this.lists = data, (e) => {},
          () => {this.changeCurrentList(newId); }); }));
  }

  deleteList(id) {
    this.lists.splice(this.getIndexById(this.lists, id), 1);

    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].list === id) {
        this.deleteDataFromDB('tasks', this.tasks[i].id).subscribe((data: Task) => {console.log(data); });
      }
    }
    this.deleteDataFromDB('lists', id).subscribe((data: List) => {console.log(data); }, (error) => {console.log(error)},
      () => this.getTasksFromDB().subscribe(data => {this.tasks = data; }, (error) => {console.log(error); },
        () => {this.getListsFromDB().subscribe(data => this.lists = data); }));
    this.changeCurrentList(id - 1);
  }

  changeCurrentList(id) {
    this.currentListId = id;
    const i = this.getIndexById(this.lists, id);
    this.router.navigateByUrl('/lists/' + this.lists[i].name);
  }

  pinList(id) {
    const i = this.getIndexById(this.lists, id);
    const newList = this.lists[i];
    newList.pinned = !newList.pinned;
    this.makePatchToDB('lists', id, newList).subscribe((data: Task) => console.log(data),
      (error) => {console.log(error); },
      () => {this.getListsFromDB().subscribe(data => this.lists = data); });
  }

  navigateToList(listIndex: number) {
    const id = this.lists[listIndex].id;
    this.router.navigateByUrl('/lists/' + this.lists[listIndex].name);
    this.changeCurrentList(id);
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
        this.changeCurrentList(list.id);
        break;
      }
    }
  }

  private getIndexById(target, id: number) {
    return target.findIndex(list => list.id === id);
  }
}
