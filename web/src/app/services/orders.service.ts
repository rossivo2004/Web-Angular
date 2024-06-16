import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getOrders(): Observable<Orders[]> {
    return this.httpClient.get<Orders[]>(`${this.url}/orders`);
  }

  addOrder(body: Orders): Observable<Orders> {
    return this.httpClient.post<Orders>(`${this.url}/orders/add`, body);
  }
}
