import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { Categories } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin_products.component.html',
  styleUrls: ['./admin_products.component.css'],
})
export class Admin_productsComponent implements OnInit {
  products!: Products[];
  productsForm!: FormGroup;
  categories!: Categories[];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router
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
        this.products = data as Products[];
      },
      (error) => {
        console.error('Error fetching products:', error);
        alert('Có lỗi xảy ra khi tải sản phẩm');
      }
    );
  }

  loadCategories() {
    this.categoriesService.getAllCategories().subscribe(
      (data) => {
        this.categories = data as Categories[];
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
        const response = await fetch(
          `http://localhost:3000/products/delete/${productId}`,
          { method: 'DELETE' }
        );
        const data = await response.json();
        if (response.ok) {
          alert('Xóa sản phẩm thành công');
          this.loadProducts(); // Refresh the product list
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

  onSubmit() {
    const productData = this.productsForm.value;
    this.productsService.addProduct(productData).subscribe(
      (data) => {
        alert('Thêm sản phẩm thành công');
        this.loadProducts(); // Refresh the product list
        this.productsForm.reset(); // Reset the form after submission
      },
      (error) => {
        alert('Thêm sản phẩm thành công');
        window.location.reload();
      }
    );
  }
}
