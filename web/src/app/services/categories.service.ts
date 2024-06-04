import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersService } from './users.service';
import { Categories } from '../models/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private auth: UsersService) {}

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.auth.getToken()
    });
  }

  getAllCategories(): Observable<Categories[]> {
    const headers = this.createHeaders();
    return this.httpClient.get<Categories[]>(`${this.url}/categories`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching all categories', error);
        throw error;
      })
    );
  }

  addCategories(body: Categories): Observable<Categories> {
    const headers = this.createHeaders();
    return this.httpClient.post<Categories>(`${this.url}/categories/add_ct`, body, { headers }).pipe(
      catchError(error => {
        console.error('Error adding category', error);
        throw error;
      })
    );
  }

  getDetailCategories(id: string): Observable<Categories> {
    const headers = this.createHeaders();
    return this.httpClient.get<Categories>(`${this.url}/categories/${id}`, { headers }).pipe(
      catchError(error => {
        console.error(`Error fetching category details for id ${id}`, error);
        throw error;
      })
    );
  }

  editCategory(id: string, body: Categories): Observable<any> {
    const headers = this.createHeaders();
    return this.httpClient.put<any>(`${this.url}/categories/edit/${id}`, body, { headers }).pipe(
      catchError(error => {
        console.error(`Error editing category for id ${id}`, error);
        throw error;
      })
    );
  }
}
