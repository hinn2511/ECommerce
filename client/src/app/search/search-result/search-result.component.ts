import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, SubCategory } from 'src/app/_models/categories';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { SearchProductParams } from 'src/app/_models/searchProductParams';
import { CategoryService } from 'src/app/_services/category.service';
import { SearchService } from 'src/app/_services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  products: Product[];
  categories: Category[];
  keyword: string = '';
  sort: string;
  category: string;
  subCategory: SubCategory;
  pagination: Pagination;
  searchProductParams: SearchProductParams;
  filterToggleMobile: boolean;
  filterToggleDesktop: boolean;

  constructor(private seachService: SearchService, private categoryService: CategoryService, private route: ActivatedRoute) {
    this.searchProductParams = this.seachService.getSearchProductParams();
  }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'];
      this.searchProductParams.keyword = this.keyword;
      this.loadResult();
    });
    this.loadCategories();
    this.filterToggleMobile = false;
    this.filterToggleDesktop = true;
    this.sort = "Mới nhất";

  }

  loadResult() {
    this.seachService.setSearchProductParams(this.searchProductParams);
    this.seachService.getProductSearchResult(this.searchProductParams).subscribe(response => {
      this.products = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilter() {
    this.searchProductParams = this.seachService.resetSearchProductParams();
    this.searchProductParams.keyword = this.keyword;
    this.loadResult();
  }

  pageChanged(event: any) {
    if (this.searchProductParams.pageNumber !== event.page) {
      this.searchProductParams.pageNumber = event.page;
      this.seachService.setSearchProductParams(this.searchProductParams);
      this.loadResult();
    }
  }

  selectSort(type: string) {
    if (type == "newest") this.sort = "Mới nhất";
    if (type == "highestPrice") this.sort = "Giá từ cao xuống thấp";
    if (type == "lowestPrice") this.sort = "Giá từ thấp đến cao";
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(result => {
      this.categories = result;
      this.category = this.categories[0].categoryName;
    })
  }

  chooseCategory(categoryName: string) {
    this.category = categoryName;
    this.searchProductParams.categories = categoryName;
    this.seachService.setSearchProductParams(this.searchProductParams);
    this.loadResult();
  }

  resizeFilter() {
    this.filterToggleDesktop = !this.filterToggleDesktop;
    this.filterToggleMobile = !this.filterToggleMobile;
  }

}
