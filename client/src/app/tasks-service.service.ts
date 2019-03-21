import {Injectable} from '@angular/core';

import {Router} from '@angular/router';
import {ServerService} from './server.service';
import {List} from './List';
import {Task} from './Task';

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {

  currentListId = 0;
  tasks: Task[] = [{id: 0, name: 'name', list: -1, checked: false}];
  lists: List[] = [{id: 0, name: 'name', pinned: false}];

  constructor(private serverService: ServerService, private router: Router) {
    this.serverService.getTasks().subscribe(data => this.tasks = data);
    this.serverService.getLists().subscribe(data => this.lists = data, (e) => {},
      () => this.changeCurrentListIdByName(this.router.url.split('/')[2]));
  }

  // TASKS
  getTasksInList(id, amount: number, checked: boolean) {
    return this.tasks.filter(task => task.list === id)
      .filter(task => task.checked === checked)
      .slice(0, amount);
  }

  addNewTask(taskName) {
    let newId = -1;
    for (const task of this.tasks) {
      if (task.id > newId) {
        newId = task.id;
      }
    }
    newId++;
    const task = {id: newId, name: taskName, list: this.currentListId, checked: false};

    this.serverService.postData(task, 'tasks').subscribe((data: List) => console.log(data), (e) => {},
      () => {this.serverService.getTasks().subscribe(data => this.tasks = data); });
  }

  deleteTask(task) {
    this.serverService.deleteData('tasks', task.id).subscribe((data: Task) => {console.log(data); }, (e) => {console.log(e); },
      () => {this.serverService.getTasks().subscribe(data => this.tasks = data); });
  }

  toggleTaskChecked(task) {
    task.checked = !task.checked;
    this.serverService.makePatch('tasks', task.id, task).subscribe((data: Task) => console.log(data),
      (error) => {console.log(error); },
      () => {this.serverService.getTasks().subscribe(data => this.tasks = data); });
  }

  changeTaskName(name, task) {
    task.name = name;
    this.serverService.makePatch('tasks', task.id, task).subscribe((data: Task) => console.log(data),
      (error) => {console.log(error); },
      () => {this.serverService.getTasks().subscribe(data => this.tasks = data); });
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

    const newList = {id: newId, name: listName, pinned: false};

    this.serverService.postData(newList, 'lists').subscribe((data: List) => {console.log(data); }, (error) => {console.log(error); },
      () => this.serverService.getTasks().subscribe(data => {this.tasks = data; }, (error) => {console.log(error); },
        () => {this.serverService.getLists().subscribe(data => this.lists = data, (e) => {},
          () => {this.changeCurrentList(newList); }); }));
  }

  deleteList(list) {
    this.serverService.deleteData('lists', list.id).subscribe((data: List) => {console.log(data); }, (error) => {console.log(error); },
      () => this.serverService.getTasks().subscribe(data => {this.tasks = data; }, (error) => {console.log(error); },
        () => {this.serverService.getLists().subscribe(data => this.lists = data); }));
    this.changeCurrentList(list);
  }

  changeCurrentList(list: List) {
    this.router.navigateByUrl('/lists/' + list.name);
    this.currentListId = list.id;
  }

  pinList(list: List) {
    list.pinned = !list.pinned;
    this.serverService.makePatch('lists', list.id, list).subscribe((data: Task) => console.log(data),
      (error) => {console.log(error); },
      () => {this.serverService.getLists().subscribe(data => this.lists = data); });
  }

  navigateToList(list: List) {
    console.log(list);
    if (this.router.url.split('/').length === 2) {
      this.serverService.getTasks().subscribe(data => {this.tasks = data; });
    }
    this.router.navigateByUrl('/lists/' + list.name);
    this.changeCurrentList(list);
  }

  navigateToPreview() {
    this.router.navigateByUrl('/lists');
    this.serverService.getTasks().subscribe(data => {this.tasks = data; });
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
