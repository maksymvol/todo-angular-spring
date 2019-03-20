import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {Task} from './Task';
import {List} from './List';

@Injectable({
    providedIn: 'root'
})
export class ServerService {

    ROOT_URL = 'http://localhost:4001';

    constructor(private http: HttpClient) {
    }

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
}
