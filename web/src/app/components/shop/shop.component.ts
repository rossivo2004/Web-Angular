import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  products!: Products[];
  private subscription!: Subscription;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      const keyword = params['keyword'];
      const tagname = params['tagname'];

      if (keyword) {
        this.productsService.getProductByQuery({ keyword }).subscribe(data => {
          this.products = (data as any).products as Products[];
          console.log(this.products);
        }, error => {
          console.error('Error fetching products by keyword:', error);
        });
      } else if (tagname) {
        this.productsService.getProductByQuery({ tagname }).subscribe(data => {
          this.products = (data as any).products as Products[];
          console.log(this.products);
        }, error => {
          console.error('Error fetching products by tagname:', error);
        });
      } else {
        this.loadAllProducts();
      }
    });
  }

  loadAllProducts() {
    this.productsService.getAllProduct().subscribe((data) => {
      this.products = (data as any).products as Products[];
    }, (error) => {
      console.error('Error fetching products:', error);
      alert('Có lỗi xảy ra khi tải sản phẩm');
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isDiscounted(product: Products): boolean {
    return parseFloat(product.discount_pr) !== 0;
  }

  formatNumber(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
