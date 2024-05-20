import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getAllProduct(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(`${this.url}/products`);
  }

  addProduct(body: Products): Observable<Products> {
    return this.httpClient.post<Products>(`${this.url}/products/add`, body);
  }

  getDetailProduct(id: string) {
    return this.httpClient.get<Products>(`${this.url}/products/${id}`);
  }

  editProduct(id: string, body: Products) {
    return this.httpClient.put<any>(`${this.url}/products/edit/${id}`, body);
  }


  getProductHot(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(`${this.url}/products/productsHot`);
  }
}
