import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-product_detail',
  templateUrl: './product_detail.component.html',
  styleUrls: ['./product_detail.component.css'],
})
export class Product_detailComponent implements OnInit {
  product: Products | undefined; // Đảm bảo rằng kiểu dữ liệu của product phù hợp với định nghĩa của Products

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(id);
    } else {
      // Xử lý khi không có id
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
        // Xử lý khi có lỗi, ví dụ chuyển hướng đến trang lỗi
        this.router.navigate(['/error']);
      }
    );
  }
}
