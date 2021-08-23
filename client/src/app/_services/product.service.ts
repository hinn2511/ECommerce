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
  productCache = new Map();
  userParams: UserParams;


  constructor(private http: HttpClient) {
    this.userParams = new UserParams();
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams();
    return this.userParams;
  }

  getProducts() {
    if (this.products.length > 0) return of(this.products);
    return this.http.get<Product[]>(this.baseUrl + 'products').pipe(
      map(products => {
        this.products = products;
        return products;
      })
    );
  }

  getProductsByCategory(userParams: UserParams) {
    var response = this.productCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('categories', userParams.categories);
    params = params.append('minPrice', userParams.minPrice.toString());
    params = params.append('maxPrice', userParams.maxPrice.toString());
    params = params.append('orderBy', userParams.orderBy);
    return this.getPaginatedResult<Product[]>(this.baseUrl + 'products', params).pipe(
      map(response => {
        this.productCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
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
    const product = [...this.productCache.values()]
      .reduce((arr, elm) => arr.concat(elm.result), [])
      .find((product: Product) => product.productCode === productCode);
    if (product) {
      return of(product);
    }
    return this.http.get<Product>(this.baseUrl + 'products/' + productCode);
  }
}
