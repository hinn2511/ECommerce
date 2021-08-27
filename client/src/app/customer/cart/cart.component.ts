import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/_models/cart';
import { Pagination } from 'src/app/_models/pagination';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  pageNumber = 1;
  pageSize = 10;
  pagination: Pagination;

  constructor(private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCustomerCart();
  }

  loadCustomerCart() {
    this.cartService.getCustomerCart(this.pageNumber, this.pageSize).subscribe(response => {
      this.carts = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadCustomerCart();
    }
  }

  removeFromCart(productCode: string){
    this.cartService.removeFromCart(productCode).subscribe(() => {
      this.toastr.success('Đã xóa sản phẩm khỏi giỏ hàng');
      this.loadCustomerCart();
    })
  }
}
