import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserI } from '../models/user';
import { TaskI } from '../models/task';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  readonly URL_API = 'http://localhost:3000/api';
  data = JSON.parse(localStorage.getItem('USER_NAME'));
  username = this.data.name;
  selectedTask: TaskI;

  constructor(private httpClient: HttpClient) { }

  createTask (task: TaskI){
    return this.httpClient.post(`${this.URL_API}/user`, task)
  }

  getTasks () {
    return this.httpClient.get(`${this.URL_API}/user/${this.username}`)
  }

  deleteTask (id: string) {
    return this.httpClient.delete(`${this.URL_API}/user/${this.username}/${id}`)
  }

  editTask (id: string, task: TaskI) {
    return this.httpClient.put(`${this.URL_API}/user/${this.username}/${id}`, task)
  }

}  