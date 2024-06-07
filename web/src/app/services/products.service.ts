import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Products } from '../models/products';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private auth: UsersService) { }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.auth.getToken()
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && typeof error.error === 'string') {
        errorMessage += `\nError Body: ${error.error}`;
      }
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getAllProduct(): Observable<Products[]> {
    const headers = this.createHeaders();
    return this.httpClient.get<Products[]>(`${this.url}/products/admin_pr`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching all products', error);
        throw error;
      })
    );
  }

  addProduct(formData: FormData): Observable<any> { // Changed Products to FormData
    const headers = this.createHeaders();
    return this.httpClient.post<any>(`${this.url}/products/add`, formData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getDetailProduct(id: string): Observable<Products> {
    const headers = this.createHeaders();
    return this.httpClient.get<Products>(`${this.url}/products/${id}`, { headers }).pipe(
      catchError(error => {
        console.error(`Error fetching product details for id ${id}`, error);
        throw error;
      })
    );
  }

  getProductHot(): Observable<Products[]> {
    const headers = this.createHeaders();
    return this.httpClient.get<Products[]>(`${this.url}/products/productsHot`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching hot products', error);
        throw error;
      })
    );
  }

  editProduct(id: string, body: Products): Observable<any> {
    const headers = this.createHeaders();
    return this.httpClient.put<any>(`${this.url}/products/edit/${id}`, body, { headers }).pipe(
      catchError(error => {
        console.error(`Error editing product for id ${id}`, error);
        throw error;
      })
    );
  }

  getProductSale(): Observable<Products[]> {
    const headers = this.createHeaders();
    return this.httpClient.get<Products[]>(`${this.url}/products/discount/discountedProducts`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching hot products', error);
        throw error;
      })
    );
  }

  getProductByQuery(params: any) {
    console.log(params);
    let query = '';
    if (params.keyword) {
      query = `keyword=${params.keyword}`;
    }else if (params.tagname){
      query = `tagname=${params.tagname}`;
    }
    return this.httpClient.get(`${this.url}/products?${query}`)
  }
}
