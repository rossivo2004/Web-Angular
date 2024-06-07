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
  productsSale!: Products[];

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

    this.productsService.getProductSale().subscribe((data) => {
      this.productsSale = data as Products[];
      console.log(data);
      // const priceNew = data
    })
  }

  isDiscounted(product: Products): boolean {
    return parseFloat(product.discount_pr) !== 0;
  }

  formatNumber(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
