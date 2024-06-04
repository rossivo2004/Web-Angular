import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products!: Products[];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getAllProduct().subscribe((data) => {
      this.products = data as Products[];
    },
      (error) => {
        console.error('Error fetching products:', error);
        alert('Có lỗi xảy ra khi tải sản phẩm');

      })
  }

  isDiscounted(product: Products): boolean {
    return parseFloat(product.discount_pr) !== 0;
  }

  formatNumber(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

}
