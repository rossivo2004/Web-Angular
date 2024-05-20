import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../models/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getAllCategories() {
    return this.httpClient.get(`${this.url}/categories`);
  }

  addCategories(body: Categories) {
    return this.httpClient.post(`${this.url}/categories/add_ct`, body);
  }

  getDetailCategories(id: string) {
    return this.httpClient.get<Categories>(`${this.url}/categories/${id}`);
  }

  editCategory(id: string, body: Categories) {
    return this.httpClient.put<any>(`${this.url}/categories/edit/${id}`, body);
  }
}
