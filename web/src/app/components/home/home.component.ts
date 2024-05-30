import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products!: Products[];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProductHot().subscribe(
      (data) => {
        this.products = data as Products[];
        console.log(data);
        // const priceNew = data
      },
      (error) => {
        console.error('Error fetching products:', error);
        alert('Có lỗi xảy ra khi tải sản phẩm');
      }
    );
  }

  // Method to check if the product has a discount
  isDiscounted(product: Products): boolean {
    return parseFloat(product.discount_pr) !== 0;
  }
}
