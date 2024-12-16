import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'; // Import ProductService

@Component({
  selector: 'app-filtered-products',
  templateUrl: './filtered-products.component.html',
  styleUrls: ['./filtered-products.component.css'],
})
export class FilteredProductsComponent implements OnInit {
  filteredProducts: any[] = []; // Initialize as empty array

  constructor(private productService: ProductService) {} // Inject ProductService

  ngOnInit(): void {
    // Subscribe to filtered products
    this.productService.filteredProducts$.subscribe(products => {
      this.filteredProducts = products;
    });
  }
}
