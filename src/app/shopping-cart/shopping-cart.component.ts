import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service'; // Import the CartService
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  notificationMessage: string | null = null;
  notificationType: string | null = null;
  products: { name: string; price: number; quantity: number }[] = [];
  subtotal: number = 0;
  useremail: string | null = null;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private router: Router // Inject the Router service
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.useremail = localStorage.getItem('user_email'); // Retrieve user email from localStorage
  }

  loadCart(): void {
    this.products = this.cartService.getCart();
    this.updateSubtotal();
  }

  updateQuantity(index: number, change: number): void {
    const currentValue = this.products[index].quantity + change;
    if (currentValue < 0) {
      return;
    }
    this.products[index].quantity = currentValue;
    this.updateSubtotal();
  }

  updateSubtotal(): void {
    this.subtotal = this.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  }

  proceedToCheckout(): void {
    const accessToken = localStorage.getItem('access_token'); // Retrieve token from localStorage

    if (!accessToken) {
      this.notificationMessage = 'Authorization token is missing. Please log in again.';
      this.notificationType = 'error';
      return;
    }

    if (!this.useremail) {
      this.notificationMessage = 'User email is missing. Please log in again.';
      this.notificationType = 'error';
      return;
    }

    const payload = {
      products: this.products,
      useremail: this.useremail,
    };

    const apiUrl = 'http://localhost:5000/orders/create'; // Replace with your backend endpoint
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`, // Set Authorization header
    });

    this.http.post(apiUrl, payload, { headers }).subscribe({
      next: (response) => {
        this.notificationMessage = 'Order placed successfully!';
        this.notificationType = 'success';
        console.log('Response from backend:', response);

        // Clear cart after successful checkout
        this.clearCart();

        // Navigate to feedback page after order is placed
        setTimeout(() => {
          this.router.navigate(['/feedback']); // Replace '/feedback' with your feedback route
        }, 1500); // Delay to show success message before navigation
      },
      error: (err) => {
        this.notificationMessage = 'Error placing order. Please try again.';
        this.notificationType = 'error';
        console.error('Error during checkout:', err);
      },
    });

    setTimeout(() => {
      this.notificationMessage = null;
      this.notificationType = null;
    }, 3000); // Clear the message after 3 seconds
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.products = [];
    this.subtotal = 0;
  }
}
