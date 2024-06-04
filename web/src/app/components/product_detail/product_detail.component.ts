import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/products';
import { CartService } from 'src/app/services/Cart.service';

@Component({
  selector: 'app-product_detail',
  templateUrl: './product_detail.component.html',
  styleUrls: ['./product_detail.component.css'],
})
export class Product_detailComponent implements OnInit {
  product: Products | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(id);
    } else {
      console.error('ID is missing');
    }
  }

  loadProduct(id: string) {
    this.productService.getDetailProduct(id).subscribe(
      (data: Products) => {
        console.log('Product details:', data);
        this.product = data;
      },
      (error) => {
        console.error('Error fetching product details:', error);
        this.router.navigate(['/error']);
      }
    );
  }

  addToCart(product: Products) {
    if (product) {
      this.cartService.addToCart(product);
      this.toastAddSuccess();
    } else {
      console.error('Product is undefined');
    }
  }

  toastAddSuccess() {
    const toast = document.createElement('div');

    toast.innerHTML = `
      <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: green; color: white; padding: 10px; border-radius: 8px; z-index: 1000;">
        Thêm sản phẩm thành công
        <i class="fa-solid fa-circle-check ml-2"></i>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  }

  formatNumber(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
