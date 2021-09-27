import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from '../_models/order';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  baseUrl = environment.apiUrl;
  paymentMethods: PaymentMethod[] = [];

  
  constructor(private http: HttpClient) { }


  getAllPaymentMethods() {
    if (this.paymentMethods.length > 0) return of(this.paymentMethods);
    return this.http.get<PaymentMethod[]>(this.baseUrl + 'payment').pipe(
      map(result => {
        this.paymentMethods = result;
        return this.paymentMethods;
      })
    );
  }
}