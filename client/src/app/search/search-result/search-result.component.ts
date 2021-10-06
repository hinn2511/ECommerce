import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { SearchProductParams } from 'src/app/_models/searchProductParams';
import { SearchService } from 'src/app/_services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  products: Product[];
  keyword: string = '';
  sort: string;
  pagination: Pagination;
  searchProductParams: SearchProductParams;

  constructor(private seachService: SearchService, private route: ActivatedRoute) {
    this.searchProductParams = this.seachService.getSearchProductParams();
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.keyword = params['keyword'];
    //   this.searchProductParams.keyword = this.keyword;
    //   console.log(this.keyword);
    //   this.loadResult();
    // });
    this.route.queryParams.subscribe(params => {
      this.searchProductParams.keyword = params['keyword'];
      this.loadResult();
    });
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

}
