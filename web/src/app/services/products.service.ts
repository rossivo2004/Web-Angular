import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../models/products';
import { Observable, from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  // Hàm này thực hiện gửi yêu cầu với access token
  private async getRequestOptions() {
    let accessToken = localStorage.getItem('access_token');

    // Kiểm tra xem access token có tồn tại không
    if (!accessToken) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        // window.location.href = 'http://localhost:4200/login';
        // Xử lý tại đây nếu không có access token
        return {};
      }

      try {
        const response = await axios.post(`${this.url}/products/refresh-token`, {
          refresh_token: refreshToken,
        });

        accessToken = response.data.access_token;
        if (accessToken) {
          localStorage.setItem('access_token', accessToken);
        }

        const newRefreshToken = response.data.refresh_token;
        if (newRefreshToken) {
          localStorage.setItem('refresh_token', newRefreshToken);
        }
      } catch (error) {
        console.error('Error refreshing token', error);
        window.location.href = 'http://localhost:4200/login';
        return {};
      }
    }

    // Đặt access token trong header của yêu cầu HTTP
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    };
  }

  getAllProduct(): Observable<Products[]> {
    return from(this.getRequestOptions()).pipe(
      switchMap((requestOptions) =>
        this.httpClient.get<Products[]>(`${this.url}/products`, requestOptions)
      ),
      catchError(error => {
        console.error('Error fetching all products', error);
        throw error;
      })
    );
  }

  addProduct(body: Products): Observable<Products> {
    return from(this.getRequestOptions()).pipe(
      switchMap((requestOptions) =>
        this.httpClient.post<Products>(`${this.url}/products/add`, body, requestOptions)
      ),
      catchError(error => {
        console.error('Error adding product', error);
        throw error;
      })
    );
  }

  getDetailProduct(id: string): Observable<Products> {
    return from(this.getRequestOptions()).pipe(
      switchMap((requestOptions) =>
        this.httpClient.get<Products>(`${this.url}/products/${id}`, requestOptions)
      ),
      catchError(error => {
        console.error(`Error fetching product details for id ${id}`, error);
        throw error;
      })
    );
  }

  editProduct(id: string, body: Products): Observable<any> {
    return from(this.getRequestOptions()).pipe(
      switchMap((requestOptions) =>
        this.httpClient.put<any>(`${this.url}/products/edit/${id}`, body, requestOptions)
      ),
      catchError(error => {
        console.error(`Error editing product for id ${id}`, error);
        throw error;
      })
    );
  }

  getProductHot(): Observable<Products[]> {
    return from(this.getRequestOptions()).pipe(
      switchMap((requestOptions) =>
        this.httpClient.get<Products[]>(`${this.url}/products/productsHot`, requestOptions)
      ),
      catchError(error => {
        console.error('Error fetching hot products', error);
        throw error;
      })
    );
  }
}
