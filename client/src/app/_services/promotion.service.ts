import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RedeemResult } from '../_models/redeemResult';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }


  redeemPromotionCode(promotionCode: string) {
    return this.http.get<RedeemResult>(this.baseUrl + 'promotion/redeem/' + promotionCode);
  }
}