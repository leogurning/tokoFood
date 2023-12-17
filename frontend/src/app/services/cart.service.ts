import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //private cart: Cart = new Cart();
  /**
   * cart should be retrieved from Local Storage to maintain/keep
   * the data exist when refreshing the page
   */
  private cart: Cart = this.getCartFromLocalStorage();
  
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(food: Food): void {
    let cartItem = this.cart.items
      .find(item => item.food.id === food.id);

    if (cartItem)
      return;

    this.cart.items.push(new CartItem(food));
    //Must be set in the local storage
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items
      .filter(item => item.food.id != foodId);

    //Must be set in the local storage
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items
      .find(item => item.food.id === foodId);

    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;

    //Must be set in the local storage
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    //Must be set in the local storage
    this.setCartToLocalStorage();
  }
 
  /**
   * getCartObservable is to capture/listening all of modification in the cart
   * @returns Observable<Cart>
   */
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  /**
   * setCartToLocalStorage to save the cart in the local storage
   * in order to avoid loosing data cart when refreshing the page
   */
  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  /**
   * getCartFromLocalStorage to get Cart data from local storage
   * @returns Cart
   */
  private getCartFromLocalStorage(): Cart {
    let cartJson;
    if (typeof localStorage !== 'undefined') {
      // Access and use localStorage here
      cartJson = localStorage.getItem('Cart');
    } else {
      cartJson = null;
    }
    
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
