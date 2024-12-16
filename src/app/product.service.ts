import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/products/get_all_product'; // Replace with your API URL
  private products: any[] = [];
  private filteredProductsSource = new BehaviorSubject<any[]>(this.products);
  filteredProducts$ = this.filteredProductsSource.asObservable();
  constructor(private http: HttpClient) {}

  // Fetch all products from the API
  fetchProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Set the products (usually called after fetching from the API)
  setProducts(products: any[]): void {
    this.products = products;
  }

  // Filter products by price range
  filterByPrice(minPrice: number, maxPrice: number): any[] {
    return this.products.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
  }
}