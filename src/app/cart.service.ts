import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: { name: string; price: number; quantity: number }[] = [];

  constructor() {}

  // Add a product to the cart
  addToCart(product: { name: string; price: number; quantity: number }): void {
    const existingProduct = this.cart.find((item) => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      this.cart.push(product);
    }
  }

  // Get the current cart
  getCart(): { name: string; price: number; quantity: number }[] {
    return this.cart;
  }

  // Clear the cart
  clearCart(): void {
    this.cart = [];
  }
}
