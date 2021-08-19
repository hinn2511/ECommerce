import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];

  constructor(private http: HttpClient) { }

  getProducts() {
    if(this.products.length > 0) return of(this.products);
    return this.http.get<Product[]>(this.baseUrl + 'products').pipe(
      map(products => {
        this.products = products;
        return products;
      })
    );
  }

  getProductsByCategory(category: string) {
    const productsByCategory = this.products.filter(x => x.category === category);
    if(productsByCategory.length > 0) return of(productsByCategory);
    return this.http.get<Product[]>(this.baseUrl + 'products').pipe(
      map(products => {
        this.products = products;
        return products.filter(x => x.category === category);
      })
    );
  }

  getProduct(productCode: string, productName: string) {
    const product = this.products.find(x => x.productCode === productCode && x.productName === productName);
    if(product !== undefined) return of(product);
    return this.http.get<Product>(this.baseUrl + 'products/' + productCode + '/' + productName);
  }
}
