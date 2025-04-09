// src/app/product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiBaseUrl = 'https://restapi-omarashrafabdelghafour-omars-projects-67aea2a3.vercel.app/products'; // API base URL
  private products: any[] = []; // Local cache of all products

  private filteredProductsSource = new BehaviorSubject<any[]>([]); // BehaviorSubject for filtered products
  filteredProducts$ = this.filteredProductsSource.asObservable(); // Observable for components to subscribe

  constructor(private http: HttpClient) {}

  /**
   * Fetch all products from the API
   */
  fetchAllProducts(): void {
    this.http.get<any[]>(`${this.apiBaseUrl}/get_all_product`).subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProductsSource.next(this.products); // Emit all products
      },
      error: (err) => console.error('Error fetching products:', err),
    });
  }

  /**
   * Search products dynamically using the API
   * @param query - Search query entered by the user
   */
  searchProducts(query: string): void {
    if (!query.trim()) {
      this.filteredProductsSource.next(this.products); // Reset to all products
      return;
    }

    this.http.get<any[]>(`${this.apiBaseUrl}/search?key=${query}`).subscribe({
      next: (data) => {
        this.filteredProductsSource.next(data); // Emit search results
      },
      error: (err) => {
        console.error('Error searching products:', err);
        this.filteredProductsSource.next([]); // Emit empty if search fails
      },
    });
  }

  /**
   * Filter products locally by price range
   * @param minPrice - Minimum price
   * @param maxPrice - Maximum price
   */
  filterProductsByPrice(minPrice: number, maxPrice: number): void {
    const filtered = this.products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    this.filteredProductsSource.next(filtered); // Emit filtered products
  }

  /**
   * Reset filters to show all products
   */
  resetFilters(): void {
    this.filteredProductsSource.next(this.products);
  }
}
