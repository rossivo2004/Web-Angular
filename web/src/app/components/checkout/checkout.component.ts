import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/Cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  totalPrice: number = 0;
  ship: number = 20000; // Shipping cost
  tax: number = 0;
  sum: number = 0;
  currentUser: Users | null = null;
  checkoutForm: FormGroup;

  constructor(
    private cartService: CartService,
    private usersService: UsersService,
    private ordersService: OrdersService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize the form with form controls and validators
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Subscribe to the cart observable to get cart items and calculate totals
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.totalAmount = this.cartItems.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
      this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.productPrice, 0);
      this.tax = this.totalAmount * 0.1; // 10% tax
      this.sum = this.totalAmount + this.ship + this.tax;
    });

    // Check if the user is logged in and populate the form if they are
    this.checkUser();
  }

  // Format number with dot separators for thousands
  formatNumber(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Check if a user is logged in and populate the form with their data
  checkUser() {
    const currentUser = this.usersService.checkLogin();
    if (currentUser) {
      this.usersService.getUserById(currentUser._id).subscribe(user => {
        this.currentUser = user;
        this.checkoutForm.patchValue({
          email: user.email_us,
          name: user.name_us,
          phone: user.phone_us,
          address: user.address_us
        });
      }, error => {
        console.error('Error fetching user data:', error);
      });
    }
  }

  // Place an order if the form is valid and the user is logged in
  placeOrder() {
    if (this.checkoutForm.invalid) {
      alert('Please fill out all required fields.');
      return;
    }



    // Prepare the order data
    const orderData = {
      cartItems: this.cartItems,
      totalAmount: this.totalAmount,
      userId: this.currentUser ? this.currentUser._id : null as unknown as string,
      orderDate: new Date().toISOString(),
      status: 'Pending',
      fullName: this.checkoutForm.value.name,
      phoneNumber: this.checkoutForm.value.phone,
      address: this.checkoutForm.value.address
    };


    // Send the order data to the OrdersService
    this.ordersService.addOrder(orderData).subscribe(
      response => {
        alert('Order placed successfully!');
        this.router.navigate(['/']);
        this.cartService.clearCart(); // Clear the cart
      },
      error => {
        console.error('Error placing order:', error);
        alert('There was an error placing your order. Please try again.');
      }
    );
  }
}
