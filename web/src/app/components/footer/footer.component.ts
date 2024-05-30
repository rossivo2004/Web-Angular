import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/Cart.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.totalAmount = this.cartItems.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
    });
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }
}
