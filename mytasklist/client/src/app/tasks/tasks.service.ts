import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TasksService {
  BASE_URL: String = 'http://tasks/';
  constructor(private http: Http) {
    console.log('Service initialize');
  }

  getTasks() {
    return this.http.get(this.BASE_URL + 'api/tasks')
                    .map(res => res.json());
  }

  addTask(newTask) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.BASE_URL + 'api/task', JSON.stringify(newTask), {headers: headers})
                    .map(res => res.json());
  }

  deleteTask(id) {
    return this.http.delete(this.BASE_URL + 'api/task/' + id)
                    .map(res => res.json());
  }

  updateTask(task) {
    console.log(task);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.BASE_URL + 'api/task/' + task._id, JSON.stringify(task), {headers: headers})
                    .map(res => res.json());
  }

}
