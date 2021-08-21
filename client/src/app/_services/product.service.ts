import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Product } from '../_models/product';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];
  

  constructor(private http: HttpClient) { }

  getProducts() {
    if (this.products.length > 0) return of(this.products);
    return this.http.get<Product[]>(this.baseUrl + 'products').pipe(
      map(products => {
        this.products = products;
        return products;
      })
    );
  }

  getProductsByCategory(userParams: UserParams, category: string) {
    // let params = new HttpParams();

    // if (page !== null && itemsPerPage !== null) {
    //   params = params.append('pageNumber', page.toString());
    //   params = params.append('pageSize', itemsPerPage.toString());
    // }

    // return this.http.get<Product[]>(this.baseUrl + 'products/categories/' + category, { observe: 'response', params }).pipe(
    //   map(response => {
    //     this.paginatedResult.result = response.body;
    //     if (response.headers.get('Pagination') != null) {
    //       this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
    //     }
    //     return this.paginatedResult;
    //   })
    // );

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minPrice', userParams.minPrice.toString());
    params = params.append('maxPrice', userParams.maxPrice.toString());
    params = params.append('orderBy', userParams.orderBy);
    return this.getPaginatedResult<Product[]>(this.baseUrl + 'products/categories/' + category, params);
  }


  getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }

  getProduct(productCode: string, productName: string) {
    const product = this.products.find(x => x.productCode === productCode && x.productName === productName);
    if (product !== undefined) return of(product);
    return this.http.get<Product>(this.baseUrl + 'products/' + productCode + '/' + productName);
  }
}
