import { Injectable } from '@angular/core';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../_models/cartItem';
import { Cart } from '../_models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addToCart(cartItem: CartItem) {
    return this.http.post(this.baseUrl + 'cart/add-to-cart' , cartItem);
  }

  removeFromCart(productCode: string) {
    return this.http.delete(this.baseUrl + 'cart/remove-from-cart/' + productCode);
  }

  adjustCartItem(cartItem: CartItem) {
    return this.http.put(this.baseUrl + 'cart/adjust-cart-item' , cartItem);
  }

  getCustomerCart(pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<Cart[]>(this.baseUrl + 'cart', params, this.http);
  }
}
