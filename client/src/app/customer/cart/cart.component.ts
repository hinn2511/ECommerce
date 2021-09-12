import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/_models/cart';
import { CartItem } from 'src/app/_models/cartItem';
import { Pagination } from 'src/app/_models/pagination';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;
  total = 0;

  constructor(private cartService: CartService, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.loadCustomerCart();
    
  }

  loadCustomerCart() {
    this.cartService.getCustomerCart(this.pageNumber, this.pageSize).subscribe(response => {
      this.carts = response.result;
      this.pagination = response.pagination;
      ;this.loadTotal();
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
      this.loadTotal();
    })
  }

  showProduct(item: any){
    this.route.navigateByUrl('product/' + item.productCode + '/' + item.productName)
  }

  loadTotal() {
    this.cartService.getAllCustomerCart().subscribe(response => {
      this.total = 0;
      for ( let item of response) {
        this.total = this.total + item.price * item.quantity;
      }
    })
  }

  
}
