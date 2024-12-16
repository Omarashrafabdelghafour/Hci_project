import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-statistics-overview',
  templateUrl: './statistics-overview.component.html',
  styleUrls: ['./statistics-overview.component.css'],
})
export class StatisticsOverviewComponent implements OnInit {
  orders: any = null; // To store the order details
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    const email = localStorage.getItem('user_email'); // Get user email from localStorage
    const token = localStorage.getItem('access_token'); // Get token from localStorage

    if (!email || !token) {
      this.errorMessage = 'User email or access token is missing. Please log in again.';
      return;
    }

    const apiUrl = `http://localhost:5000/orders/${email}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Add token to header
    });

    this.http.get(apiUrl, { headers }).subscribe({
      next: (response: any) => {
        this.orders = response; // Save the order details
        console.log('Order response:', response);
      },
      error: (err) => {
        this.errorMessage = 'Error fetching orders. Please try again.';
        console.error('Error fetching orders:', err);
      },
    });
  }
}
