import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { JoinModel } from '../models/join-form' 

@Injectable({
  providedIn: 'root'
})
export class JoinFormService {

  joinModel: JoinModel;
  sendSucces: boolean = false;

  readonly URL_API = 'http://localhost:3200/';

  constructor(private http: HttpClient) {
    this.joinModel = new JoinModel();  
  }

  postForm(join: JoinModel){
    return this.http.post(this.URL_API, join)
      .subscribe(
        (response) => { return this.sendSucces },
        (error) => { console.error(error) }
      );
  }

  getForms(){
    return this.http.get(this.URL_API);
  }
}
