import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  filteredProducts: any[] = [];
  searchQuery: string = '';
  minPrice: number = 0;
  maxPrice: number = 1000;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.fetchAllProducts(); // Load all products
    this.productService.filteredProducts$.subscribe((data) => {
      this.filteredProducts = data;
    });
  }

  searchProducts(): void {
    this.productService.searchProducts(this.searchQuery);
  }

  filterProductsByPrice(): void {
    this.productService.filterProductsByPrice(this.minPrice, this.maxPrice);
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.minPrice = 0;
    this.maxPrice = 1000;
    this.productService.resetFilters();
  }

  addToCart(product: any): void {
    this.cartService.addToCart({ name: product.name, price: product.price, quantity: 1 });
    const notification = document.getElementById("notification");
  if (notification) {
    notification.textContent = `${product.name} has been added to the cart!`;
    notification.classList.add("show");

    // Remove the notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }
}}
