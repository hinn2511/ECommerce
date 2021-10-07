import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';
import { SearchProductParams } from '../_models/searchProductParams';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];
  productCache = new Map();
  searchProductParams: SearchProductParams;


  constructor(private http: HttpClient) {
    this.searchProductParams = new SearchProductParams();
  }

  getSearchProductParams() {
    return this.searchProductParams;
  }

  setSearchProductParams(params: SearchProductParams) {
    this.searchProductParams = params;
  }

  resetSearchProductParams() {
    this.searchProductParams = new SearchProductParams();
    return this.searchProductParams;
  }

  getProductSearchResult(searchProductParams: SearchProductParams) {
    var response = this.productCache.get(Object.values(searchProductParams).join('-'));
    if (response) {
      return of(response);
    }
    let params = getPaginationHeaders(searchProductParams.pageNumber, searchProductParams.pageSize);
    params = params.append('keyword', searchProductParams.keyword);
    params = params.append('categories', searchProductParams.categories);
    params = params.append('minPrice', searchProductParams.minPrice.toString());
    params = params.append('maxPrice', searchProductParams.maxPrice.toString());
    params = params.append('orderBy', searchProductParams.orderBy);
    return getPaginatedResult<Product[]>(this.baseUrl + 'search/product', params, this.http).pipe(
      map(response => {
        this.productCache.set(Object.values(searchProductParams).join('-'), response);
        return response;
      })
    );
  }

}