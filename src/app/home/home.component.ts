import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../cart.service'; // Import the CartService

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  notificationMessage: string = '';
  notificationType: string = 'hidden';

  constructor(private http: HttpClient, private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.checkForFeedback();
  }

  fetchProducts(): void {
    const apiUrl = 'http://localhost:5000/products/get_all_product'; // Replace with your API
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Failed to fetch products', err),
    });
  }

  addToCart(productName: string, productPrice: number): void {
    if (!productName || productPrice <= 0) {
      this.showNotification('Error: Invalid product.', 'error');
    } else {
      this.cartService.addToCart({ name: productName, price: productPrice, quantity: 1 });
      this.showNotification(`${productName} added to cart for $${productPrice.toFixed(2)}.`, 'success');
    }
  }

  showNotification(message: string, type: string): void {
    this.notificationMessage = message;
    this.notificationType = type;

    setTimeout(() => (this.notificationType = 'hidden'), 3000);
  }

  checkForFeedback(): void {
    const feedbackReceived = localStorage.getItem('feedbackReceived');
    if (feedbackReceived) {
      this.showNotification('Thank you for your feedback!', 'success');
      localStorage.removeItem('feedbackReceived');
    }
  }
}
