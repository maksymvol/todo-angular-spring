import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {Task} from './Task';
import {List} from './List';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ServerService {

    ROOT_URL = 'http://localhost:4001';

    constructor(private http: HttpClient, private router: Router) {
    }

    getTasks(): Observable<Task[]> {
        if (this.router.url.split('/').length === 2) {
            return this.http.get<Task[]>(this.ROOT_URL + '/tasks/preview');
        } else {
            return this.http.get<Task[]>(this.ROOT_URL + '/tasks');
        }
    }

    getTasksPreview(): Observable<Task[]> {
        return this.http.get<Task[]>(this.ROOT_URL + '/tasks/preview');
    }

    getLists(): Observable<List[]> {
        return this.http.get<List[]>(this.ROOT_URL + '/lists');
    }

    deleteData(targetList: string, id) {
        return this.http.delete(this.ROOT_URL + '/' + targetList + '/' + id);
    }

    postData(newData: any, target: string) {
        return this.http.post(this.ROOT_URL + '/' + target, newData);
    }

    makePatch(target, id, data) {
        return this.http.patch(this.ROOT_URL + '/' + target + '/' + id, data);
    }
}
