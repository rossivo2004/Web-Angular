import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new BehaviorSubject<any[]>(this.getCartItemsFromLocalStorage());
  cart$ = this.cart.asObservable();

  constructor() {}

  private getCartItemsFromLocalStorage(): any[] {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  }

  addToCart(product: any) {
    const currentCart = this.cart.value;
    const existingProductIndex = currentCart.findIndex(item => item.productId === product._id);

    if (existingProductIndex !== -1) {
      currentCart[existingProductIndex].quantity += 1;
    } else {
      currentCart.push({
        productId: product._id ?? "",
        productName: product.name_pr ?? "",
        productPrice: product.price_pr * (1 - product.discount_pr / 100) ?? "",
        productImage: product.image_pr_1 ?? "",
        quantity: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));
    this.cart.next(currentCart);
  }

  removeFromCart(index: number) {
    const currentCart = this.cart.value;
    currentCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    this.cart.next(currentCart);
  }

  clearCart(){
    localStorage.removeItem('cart');
    this.cart.next([]);
  }
}
