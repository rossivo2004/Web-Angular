import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userLo = new BehaviorSubject<any[]>(this.getUserFromLocalStorage());
  private url = 'http://localhost:3000';
  loggedIn = false;

  constructor(private httpClient: HttpClient) {}

  private getUserFromLocalStorage(): any[] {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : [];
  }

  getUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(`${this.url}/users`);
  }

  getUserById(id: string): Observable<Users> {
    return this.httpClient.get<Users>(`${this.url}/users/${id}`);
  }

  updateUser(id: string, body: Partial<Users>): Observable<Users> {
    return this.httpClient.put<Users>(`${this.url}/users/edit/${id}`, body);
  }

  addUser(body: Users): Observable<Users> {
    return this.httpClient.post<Users>(`${this.url}/users/add`, body);
  }

  login(user_name_us: string, password_us: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/users/login`, { user_name_us, password_us })
    .pipe(
      map(response => response)
    );
  }

  checkLogin(){
    let jsonData = localStorage.getItem('currentUser');
    if(jsonData){
      return JSON.parse(jsonData);
    }
    return false;
  }

  checkAdmin(){
    let jsonData = localStorage.getItem('currentUser');
    if(jsonData){
      if(JSON.parse(jsonData).role == 1){
        return JSON.parse(jsonData);
      }
    }
    return false;
  }

  isAuthenticated(){
    const promise = new Promise<boolean>((resolve, reject) => {
      let jsonData = localStorage.getItem('currentUser');
      if(jsonData){
        this.loggedIn = true;
        resolve(this.loggedIn);
      }else{
        resolve(this.loggedIn);
      }
    });
    return promise;
  }

  isAdmin(){
    const promise = new Promise<boolean>((resolve, reject) => {
      let jsonData = localStorage.getItem('currentUser');
      if(jsonData){
        if(JSON.parse(jsonData).role == 1){
        this.loggedIn = true;
        resolve(this.loggedIn)
        }
      }else{
        resolve(this.loggedIn);
      }
    });
    return promise;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  refreshToken(refreshToken: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/users/refresh-Token`, refreshToken);
  }
}
