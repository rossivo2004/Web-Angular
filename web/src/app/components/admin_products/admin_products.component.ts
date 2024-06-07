// admin_products.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { Categories } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/services/categories.service';
import { UsersService } from 'src/app/services/users.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin_products.component.html',
  styleUrls: ['./admin_products.component.css'],
})
export class Admin_productsComponent implements OnInit {
  products!: Products[];
  productsForm!: FormGroup;
  categories!: Categories[];
  selectedFile: File | null = null;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private auth: UsersService,
    private http: HttpClient
  ) {
    this.productsForm = new FormGroup({
      name_pr: new FormControl(''),
      category_pr_tag: new FormControl(''),
      price_pr: new FormControl(''),
      image_pr_1: new FormControl(''),
      description_pr: new FormControl(''),
      description_pr_detail: new FormControl(''),
      discount_pr: new FormControl(''),
      quantity_pr: new FormControl(''),
      view_pr: new FormControl(''),
      weight_pr: new FormControl(''),
      sale_pr: new FormControl(''),
      rating_pr: new FormControl(''),
    });
  }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productsService.getAllProduct().subscribe(
      (data) => {
        this.products = (data as any).products as Products[];
      },
      (error) => {
        console.error('Error fetching products:', error);
        if (error && error.status === 401) {
          const refreshToken = this.auth.getRefreshToken();
          if (!refreshToken) {
            this.router.navigate(['/login']);
            return;
          }
          this.auth.refreshToken({ 'refresh_token': refreshToken }).subscribe(
            (res: any) => {
              localStorage.setItem('access_token', res.access_token);
              this.loadProducts();
            },
            (refreshError) => {
              console.error('Error refreshing token:', refreshError);
              this.router.navigate(['/login']);
            }
          );
        } else {
          alert('Có lỗi xảy ra khi tải sản phẩm');
        }
      }
    );
  }

  loadCategories() {
    this.categoriesService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        alert('Có lỗi xảy ra khi tải danh mục');
      }
    );
  }

  async btn_delete_product(productId: string): Promise<void> {
    const confirmation = confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:3000/products/delete/${productId}`, { method: 'DELETE' });
        const data = await response.json();
        if (response.ok) {
          alert('Xóa sản phẩm thành công');
          this.loadProducts();
        } else {
          console.error('Error deleting product:', data);
          alert('Có lỗi xảy ra khi xóa sản phẩm');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi xóa sản phẩm');
      }
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name_pr', this.productsForm.get('name_pr')?.value);
    formData.append('category_pr_tag', this.productsForm.get('category_pr_tag')?.value);
    formData.append('price_pr', this.productsForm.get('price_pr')?.value);
    formData.append('description_pr', this.productsForm.get('description_pr')?.value);
    formData.append('description_pr_detail', this.productsForm.get('description_pr_detail')?.value);
    formData.append('discount_pr', this.productsForm.get('discount_pr')?.value);
    formData.append('quantity_pr', this.productsForm.get('quantity_pr')?.value);

    if (this.selectedFile) {
      formData.append('image_pr_1', this.selectedFile);
    }



    this.productsService.addProduct(formData).subscribe(
      (data) => {
        alert('Thêm sản phẩm thành công');
        this.productsForm.reset();
        this.selectedFile = null;
        this.loadProducts();
      },
      (error) => {
        console.error('Error fetching products:', error);
        if (error && error.status === 401) {
          const refreshToken = this.auth.getRefreshToken();
          if (!refreshToken) {
            this.router.navigate(['/login']);
            return;
          }
          this.auth.refreshToken({ 'refresh_token': refreshToken }).subscribe(
            (res: any) => {
              localStorage.setItem('access_token', res.access_token);
              this.loadProducts();
            },
            (refreshError) => {
              console.error('Error refreshing token:', refreshError);
              this.router.navigate(['/login']);
            }
          );
        } else {
          alert('Có lỗi xảy ra khi tải sản phẩm');
        }
      }
    );
  }
}
