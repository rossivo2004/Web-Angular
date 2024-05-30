import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { Categories } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-admin-products-edit',
  templateUrl: './admin_products_edit.component.html',
  styleUrls: ['./admin_products_edit.component.css'],
})
export class Admin_products_editComponent implements OnInit {
  productsForm: FormGroup;
  products!: Products | null;
  id: string | null;
  categories!: Categories[];

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id_pro');
    this.productsForm = new FormGroup({
      name_pr: new FormControl(''),
      category_pr_tag: new FormControl(''),
      price_pr: new FormControl(''),
      image_pr_1: new FormControl(''),
      description_pr: new FormControl(''),
      description_pr_detail: new FormControl(''),
      discount_pr: new FormControl(''),
      quantity_pr: new FormControl(''),
    });
  }

  ngOnInit() {
    this.loadCategories();
    if (this.id) {
      this.loadProduct(this.id);
    }
  }

  loadCategories() {
    this.categoriesService.getAllCategories().subscribe(
      (data) => {
        console.log('Categories:', data);
        this.categories = data as Categories[];
      },
      (error) => {
        console.error('Error fetching categories:', error);
        alert('Có lỗi xảy ra khi tải danh mục');
      }
    );
  }

  loadProduct(id: string) {
    this.productsService.getDetailProduct(id).subscribe(
      (data) => {
        console.log('Product details:', data);
        this.products = data;
        this.productsForm.patchValue({
          name_pr: data.name_pr,
          category_pr_tag: data.category_pr_tag, // Đảm bảo rằng key này đúng với key trong form
          price_pr: data.price_pr,
          // image_pr_1: data.image_pr.image_pr_1,
          description_pr: data.description_pr,
          description_pr_detail: data.description_pr_detail,
          discount_pr: data.discount_pr,
          quantity_pr: data.quantity_pr,
        });
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  onSubmit() {
    if (this.id) {
      this.productsService
        .editProduct(this.id, this.productsForm.value)
        .subscribe({
          next: (data) => {
            alert('Cập nhật thành công');
            this.router.navigate(['/admin_products']);
          },
          error: (error) => {
            console.error('There was an error updating the product:', error);
          },
        });
    }
  }
}
