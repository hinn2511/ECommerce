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
  productParams: ProductParams;
  state: string = '';


  constructor(private http: HttpClient) {
    this.productParams = new ProductParams();
  }

  getProductParams() {
    return this.productParams;
  }

  setProductParams(params: ProductParams) {
    this.productParams = params;
  }

  resetProductParams() {
    this.productParams = new ProductParams();
    return this.productParams;
  }

  getState() {
    return this.state;
  }

  setState(state: string) {
    this.state = state;
  }

  resetState() {
    this.state = '';
    return this.setState;
  }

  getProducts(productParams: ProductParams) {
    var response = this.productCache.get(Object.values(productParams).join('-'));
    if (response) {
      return of(response);
    }
    let params = getPaginationHeaders(productParams.pageNumber, productParams.pageSize);
    params = params.append('category', productParams.category);
    params = params.append('subCategory', productParams.subCategory);
    params = params.append('area', productParams.area);
    params = params.append('sale', productParams.sale);
    params = params.append('keyword', productParams.keyword);
    params = params.append('saleUpTo', productParams.saleUpTo.toString());
    params = params.append('minPrice', productParams.minPrice.toString());
    params = params.append('maxPrice', productParams.maxPrice.toString());
    params = params.append('orderBy', productParams.orderBy);
    return getPaginatedResult<Product[]>(this.baseUrl + 'product', params, this.http).pipe(
      map(response => {
        this.productCache.set(Object.values(productParams).join('-'), response);
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

  getRelatedProducts(productCode: string, category: string) {
    let product = [...this.productCache.values()]
      .reduce((arr, elm) => arr.concat(elm.result), [])
      .filter((product: Product) => product.productCode !== productCode && product.category === category)
      .slice(0, 6);

    product = product.slice().reverse().filter((v,i,a)=>a.findIndex(t=>(t.productCode === v.productCode))===i).reverse();
    
    if (product.length > 0) {
      return of(product);
    }
    return this.http.get<Product>(this.baseUrl + 'product/related/' + productCode);
  }





}
