import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-customer-favorite',
  templateUrl: './customer-favorite.component.html',
  styleUrls: ['./customer-favorite.component.css']
})
export class CustomerFavoriteComponent implements OnInit {
  products: Partial<Product[]> = [];
  pageNumber = 1;
  pageSize = 12;
  pagination: Pagination;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadCustomerFavorites();
  }

  loadCustomerFavorites() {
    this.productService.getCustomerFavorite(this.pageNumber, this.pageSize).subscribe(response => {
      this.products = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadCustomerFavorites();
    }
  }
}
