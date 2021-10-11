import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { ProductParams } from 'src/app/_models/productParams';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  category: string;
  area: string;
  sort: string = "Mới nhất";
  pagination: Pagination;
  productParams: ProductParams;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.productParams = this.productService.getProductParams();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category');
      if (this.category != null) {
        this.productParams.categories = this.category.toLowerCase();
        this.productParams.area = '';
      }
      this.area = params.get('area');
      if (this.area != null) {
        this.productParams.area = this.area.toLowerCase();
        this.productParams.categories = '';
      }
      this.loadProducts();
    });
  }

  loadProducts() {
    this.productService.setProductParams(this.productParams);
    this.productService.getProducts(this.productParams).subscribe(response => {
      this.products = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilter() {
    this.productParams = this.productService.resetProductParams();
    this.productParams.categories = this.category;
    this.productParams.area = this.area;
    this.loadProducts();
  }

  pageChanged(event: any) {
    if (this.productParams.pageNumber !== event.page) {
      this.productParams.pageNumber = event.page;
      this.productService.setProductParams(this.productParams);
      this.loadProducts();
    }
  }

  selectSort(type: string) {
    if (type == "newest") this.sort = "Mới nhất";
    if (type == "highestPrice") this.sort = "Giá từ cao xuống thấp";
    if (type == "lowestPrice") this.sort = "Giá từ thấp đến cao";
  }


}
