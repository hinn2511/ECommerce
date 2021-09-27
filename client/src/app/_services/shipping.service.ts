import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ShippingMethod } from '../_models/order';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  baseUrl = environment.apiUrl;
  shippingMethods: ShippingMethod[] = [];

  constructor(private http: HttpClient) { }

  getAllShippingMethods() {
    if (this.shippingMethods.length > 0) return of(this.shippingMethods);
    return this.http.get<ShippingMethod[]>(this.baseUrl + 'shipping').pipe(
      map(result => {
        this.shippingMethods = result;
        return this.shippingMethods;
      })
    );
  }
}
