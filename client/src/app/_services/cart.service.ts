import { Injectable } from '@angular/core';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartItemUpdate } from '../_models/cartItemUpdate';
import { CartItem } from '../_models/cartItem';
import { concatMap, map } from 'rxjs/operators';
import { Color } from '../_models/color';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl;
  cartCache = new Map();
  carts: CartItem[] = [];
  private totalCartItem = new BehaviorSubject<number>(1);
  currentCart$ = this.totalCartItem.asObservable();

  constructor(private http: HttpClient) {
  }

  refreshCartQuantity() {
    this.totalCartItem.next(undefined);
  }

  getCustomerCart(pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<CartItem[]>(this.baseUrl + 'cart', params, this.http);
  }

  getAllCustomerCart() {
    return this.http.get<CartItem[]>(this.baseUrl + 'cart').pipe(
      map(response => {
        this.carts = response;
        this.totalCartItem.next(this.carts.length);
        return this.carts;
      })
    );
  }

  addCartItem(cartItem: CartItemUpdate) {

    return this.http.get<CartItem[]>(this.baseUrl + 'cart').pipe(concatMap((response) => {
      this.carts = response;
      var item = this.carts.find(x => x.productCode == cartItem.productCode);
      //Tim thay san pham trong gio hang
      if (item != null) {
        cartItem.quantity = cartItem.quantity + item.quantity;
        return this.http.put(this.baseUrl + 'cart/adjust', cartItem);
      }
      // Khong tim thay san pham trong gio hang
      var newCartItem = {
        productCode: cartItem.productCode,
        colorCode: cartItem.colorCode,
        quantity: cartItem.quantity
      }
      this.totalCartItem.next(this.carts.length + 1);
      return this.http.post(this.baseUrl + 'cart/add', newCartItem);
    })
    );
  }

  removeCartItem(productCode: string) {
    return this.http.delete(this.baseUrl + 'cart/remove/' + productCode);
  }

  adjustCartItem(cartItem: CartItemUpdate) {
    return this.http.put(this.baseUrl + 'cart/adjust', cartItem);
  }



}
