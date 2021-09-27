import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addToFavorite(productCode: string) {
    return this.http.post(this.baseUrl + 'favorite/add/' + productCode, {});
  }
  
  getCustomerFavorite(pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<Partial<Product[]>>(this.baseUrl + 'favorite', params, this.http);
  }
}
