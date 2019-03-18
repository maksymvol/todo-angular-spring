import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../../Task';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private API = '//localhost:8080';
    private API_LIST = this.API + '/list';

    private tasks;

    constructor(private http: HttpClient) {
        this.getAll().subscribe(data => this.tasks = data);
    }

    getAll(): Observable<any> {
        return this.http.get(this.API_LIST);
    }

    addNewTask(taskName): Observable<Object> {
        let newId = -1;
        for (const task of this.tasks) {
            if (task.id > newId) {
                newId = task.id;
            }
        }
        newId++;
        const task = new Task(newId, taskName, 1, false);

        return this.http.post(this.API_LIST, task);
    }
}
