import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';
import { ProductParams } from '../_models/productParams';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];
  productCache = new Map();
  customerParams: ProductParams;


  constructor(private http: HttpClient) {
    this.customerParams = new ProductParams();
  }

  getProductParams() {
    return this.customerParams;
  }

  setProductParams(params: ProductParams) {
    this.customerParams = params;
  }

  resetProductParams() {
    this.customerParams = new ProductParams();
    return this.customerParams;
  }

  getProducts(customerParams: ProductParams) {
    var response = this.productCache.get(Object.values(customerParams).join('-'));
    if (response) {
      return of(response);
    }
    let params = getPaginationHeaders(customerParams.pageNumber, customerParams.pageSize);
    params = params.append('categories', customerParams.categories);
    params = params.append('area', customerParams.area);
    params = params.append('minPrice', customerParams.minPrice.toString());
    params = params.append('maxPrice', customerParams.maxPrice.toString());
    params = params.append('orderBy', customerParams.orderBy);
    return getPaginatedResult<Product[]>(this.baseUrl + 'product', params, this.http).pipe(
      map(response => {
        this.productCache.set(Object.values(customerParams).join('-'), response);
        return response;
      })
    );
  }

  getProduct(productCode: string) {
    const product = [...this.productCache.values()]
      .reduce((arr, elm) => arr.concat(elm.result), [])
      .find((product: Product) => product.productCode === productCode);
    if (product) {
      return of(product);
    }
    return this.http.get<Product>(this.baseUrl + 'product/' + productCode);
  }





}
