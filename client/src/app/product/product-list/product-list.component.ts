import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { UserParams } from 'src/app/_models/userParams';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  category: string;
  sort: string;
  pagination: Pagination;
  userParams: UserParams;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    //this.userParams = new UserParams();
    this.userParams = this.productService.getUserParams();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category').toLowerCase();
      this.userParams.categories = this.category;
      this.loadProducts();
    });
    this.sort = "Mới nhất";
  }

  loadProducts() {
    this.productService.setUserParams(this.userParams);
    this.productService.getProductsByCategory(this.userParams).subscribe(response => {
      this.products = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilter() {
    this.userParams = this.productService.resetUserParams();
    this.loadProducts();
  }

  pageChanged(event: any) {
    if (this.userParams.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.productService.setUserParams(this.userParams);
      this.loadProducts()
    }
  }

  selectSort(type: string) {
    if (type == "newest") this.sort = "Mới nhất";
    if (type == "highestPrice") this.sort = "Giá từ cao xuống thấp";
    if (type == "lowestPrice") this.sort = "Giá từ thấp đến cao";
  }


}
