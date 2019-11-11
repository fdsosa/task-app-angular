import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserI } from '../models/user';
import { TaskI } from '../models/task';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly URL_API = 'http://localhost:3000/api';
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private httpClient: HttpClient) { }

  createTask (task: TaskI){
    return this.httpClient.post(`${this.URL_API}/user`, task)
  }

}  