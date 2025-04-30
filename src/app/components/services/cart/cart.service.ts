import { computed, Injectable, signal } from '@angular/core';
import { IProduct } from '../../product/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<IProduct[]>([])
  total = this.calcTotal()

  constructor() { }

  calcTotal() {
    return computed(() => {
      const cart = this.cart()
      return cart.reduce((total, product) => total + product.price, 0)
    })
  }

  addToCart(product: IProduct) {
    this.cart.update(state => [...state, product])
  }

  DeleteFromCart(index: number) {
    this.cart.update(state => {
      const newState = [...state]; 
      newState.splice(index, 1);    
      return newState;              
    });
  }

  clearCart() {
    this.cart.set([]);
  }
}
