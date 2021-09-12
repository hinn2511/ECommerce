import { Injectable } from '@angular/core';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../_models/cartItem';
import { Cart } from '../_models/cart';
import { concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { Color } from '../_models/color';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl;
  cartCache = new Map();
  cart: CartItem[];
  cartList: Cart[];

  constructor(private http: HttpClient) {
  }

  

  removeFromCart(productCode: string) {
    return this.http.delete(this.baseUrl + 'cart/remove-from-cart/' + productCode);
  }

  adjustCartItem(cartItem: CartItem) {
    return this.http.put(this.baseUrl + 'cart/adjust-cart-item', cartItem);
  }

  getCustomerCart(pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<Cart[]>(this.baseUrl + 'cart', params, this.http);
  }

  getAllCustomerCart() {
    return this.http.get<Cart[]>(this.baseUrl + 'cart');
  }
  

  addToCart(cartItem: CartItem) {
    return this.http.get<Cart[]>(this.baseUrl + 'cart').pipe(concatMap((response) => {
      this.cartList = [];
      this.cartList = response;
      return this.http.get<Color[]>(this.baseUrl + 'products/color/' + cartItem.productCode).pipe(
        concatMap(color => {
          var item = this.cartList.find(x => x.productCode == cartItem.productCode);
          //Tim thay san pham trong gio hang
          if (item != null) {
            cartItem.quantity = cartItem.quantity + item.quantity;
            return this.http.put(this.baseUrl + 'cart/adjust-cart-item', cartItem);
          }
          // Khong tim thay san pham trong gio hang
          var newCartItem = {
            productCode: cartItem.productCode,
            colorCode: color[0]?.colorCode == undefined ? "" : color[0].colorCode,
            quantity: cartItem.quantity
          }
          return this.http.post(this.baseUrl + 'cart/add-to-cart', newCartItem);
        })
      )
    }));
  }
}
