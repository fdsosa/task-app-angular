import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly URL_API = 'http://localhost:3000/api';
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }


  register(user: UserI){
    return this.httpClient.post<JwtResponseI>(`${this.URL_API}/register`, user)
      .pipe(tap(
        (res: JwtResponseI) => { 
          if(res){
            //save token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          } 
        }
      ))
  }

  login(user: UserI){
    return this.httpClient.post<JwtResponseI>(`${this.URL_API}/login`, user)
      .pipe(tap(
        (res: JwtResponseI) => {
          if(res){
            //save token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        }
      ))
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }


  
}
