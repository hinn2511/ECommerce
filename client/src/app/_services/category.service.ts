import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category, SubCategory } from '../_models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.apiUrl;
  categories: Category[] = [];

  
  constructor(private http: HttpClient) { }

  getAllCategories() {
    if (this.categories.length > 0) return of(this.categories);
    return this.http.get<Category[]>(this.baseUrl + 'categories').pipe(
      map(result => {
        this.categories = result;
        return this.categories;
      })
    );
  }

  getSubCategories(categoryId: number) {
    return this.http.get<SubCategory[]>(this.baseUrl + 'categories/sub-categories/' + categoryId);
  }
}
