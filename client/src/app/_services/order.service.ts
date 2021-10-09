import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order';
import { OrderParams } from '../_models/orderParams';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;
  orders: Order[] = [];
  orderCache = new Map();
  orderParams: OrderParams;

  constructor(private http: HttpClient) {
    this.orderParams = new OrderParams();
  }

  getOrderParams() {
    return this.orderParams;
  }

  setOrderParams(params: OrderParams) {
    this.orderParams = params;
  }

  resetOrderParams() {
    this.orderParams = new OrderParams();
    return this.orderParams;
  }

  clearCache() {
    this.orderCache.clear();
  }

  checkout(model: any) {
    return this.http.post(this.baseUrl + 'order/checkout', model).pipe(
      map((response: Order) => {
        return response;
      })
    );
  }

  getAllCustomerOrder() {
    return this.http.get<Order[]>(this.baseUrl + 'order').pipe(
      map(response => {
        this.orders = response;
        return this.orders;
      })
    );
  }

  getCustomerOrderDetail(orderId: number) {
    const order = [...this.orderCache.values()]
      .reduce((arr, elm) => arr.concat(elm.result), [])
      .find((order: Order) => order.id === orderId);
    if (order) {
      return of(order);
    }
    return this.http.get<Order>(this.baseUrl + 'order/' + orderId + '/detail');
  }


  getCustomerOrders(orderParams: OrderParams) {
    var response = this.orderCache.get(Object.values(orderParams).join('-'));
    if (response) {
      return of(response);
    }
    let params = getPaginationHeaders(orderParams.pageNumber, orderParams.pageSize);
    params = params.append('predicate', orderParams.predicate);
    return getPaginatedResult<Order[]>(this.baseUrl + 'order', params, this.http).pipe(
      map(response => {
        this.orderCache.set(Object.values(orderParams).join('-'), response);
        return response;
      })
    );
  }

  cancelOrderByCustomer(orderId: number) {
    return this.http.post(this.baseUrl + 'order/cancel/' + orderId, {});
  }

}
