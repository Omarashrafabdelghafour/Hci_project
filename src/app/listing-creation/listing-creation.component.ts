import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-listing-creation',
  templateUrl: './listing-creation.component.html',
  styleUrls: ['./listing-creation.component.css']
})
export class ListingCreationComponent {
  productName: string = '';
  productCategory: string = '';
  productPrice: number | null = null;
  productDescription: string = '';
  productImageUrl: string = ''; // Image URL instead of File or Base64
  notificationMessage: string = '';
  notificationType: string = ''; // 'success' or 'error'

  constructor(private http: HttpClient) {}

  // Handle form submission
  onSubmit() {
    if (!this.productName || !this.productCategory || !this.productPrice || !this.productDescription || !this.productImageUrl) {
      this.showNotification('Please fill in all fields, including an image URL.', 'error');
      return;
    }

    // Retrieve the access token from sessionStorage
    const token = sessionStorage.getItem('access_token');

    if (!token) {
      this.showNotification('No token found. Please log in again.', 'error');
      return;
    }

    // Prepare the product data to send to the backend
    const productData = {
      name: this.productName,
      description: this.productDescription,
      price: this.productPrice,
      category: this.productCategory,
      image: this.productImageUrl, // Send the image URL
      Ownertoken: token // Send the token as the owner's token
    };

    // Add the token to the Authorization header
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send POST request with headers including the Bearer token
    this.http.post('https://restapi-omarashrafabdelghafour-omars-projects-67aea2a3.vercel.app/products/add', productData, { headers }).subscribe({
      next: (response) => {
        this.showNotification('Product added successfully!', 'success');
        this.resetForm();
      },
      error: (err) => {
        this.showNotification('Failed to add product. Please try again.', 'error');
        console.error('Error during product creation:', err);
      }
    });
  }

  // Show notification message
  showNotification(message: string, type: string) {
    this.notificationMessage = message;
    this.notificationType = type;
    const notification = document.getElementById('notification');
    if (notification) {
      notification.className = `notification ${type}`;
      notification.classList.remove('hidden');
      setTimeout(() => {
        notification.classList.add('hidden');
      }, 3000);
    }
  }

  // Reset the form fields
  resetForm() {
    this.productName = '';
    this.productCategory = '';
    this.productPrice = null;
    this.productDescription = '';
    this.productImageUrl = ''; // Reset the image URL
  }
}
