import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(`${this.url}/users`);
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
}
