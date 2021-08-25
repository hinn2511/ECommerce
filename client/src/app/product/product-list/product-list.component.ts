import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { CustomerParams } from 'src/app/_models/customerParams';
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
  userParams: CustomerParams;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    //this.userParams = new CustomerParams();
    this.userParams = this.productService.getCustomerParams();
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
    this.productService.setCustomerParams(this.userParams);
    this.productService.getProductsByCategory(this.userParams).subscribe(response => {
      this.products = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilter() {
    this.userParams = this.productService.resetCustomerParams();
    this.loadProducts();
  }

  pageChanged(event: any) {
    if (this.userParams.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.productService.setCustomerParams(this.userParams);
      this.loadProducts();
    }
  }

  selectSort(type: string) {
    if (type == "newest") this.sort = "Mới nhất";
    if (type == "highestPrice") this.sort = "Giá từ cao xuống thấp";
    if (type == "lowestPrice") this.sort = "Giá từ thấp đến cao";
  }


}
