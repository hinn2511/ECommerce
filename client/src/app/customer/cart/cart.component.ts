import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { delay, take, takeUntil } from 'rxjs/operators';
import { CartItem } from 'src/app/_models/cartItem';
import { CartItemUpdate } from 'src/app/_models/cartItemUpdate';
import { Color } from 'src/app/_models/color';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: CartItem[] = [];
  productColors: Color[] = [];

  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  total = 0;
  cartUpdate: CartItemUpdate = {
    productCode: '',
    colorCode: '',
    quantity: 0
  }

  user: User;

  constructor(private cartService: CartService, 
    private toastr: ToastrService, private route: Router, 
    private productService: ProductService, private accountService: AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
      })
  }

  ngOnInit(): void {
    if (this.user)
      this.loadLoggedInCustomerCart();
  }

  loadLoggedInCustomerCart() {
    this.cartService.getCustomerCart(this.pageNumber, this.pageSize).subscribe(response => {
      this.carts = response.result;
      this.pagination = response.pagination;
      this.loadTotal();
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadLoggedInCustomerCart();
    }
  }

  removeFromCart(productCode: string) {
    this.cartService.removeCartItem(productCode).subscribe(() => {
      this.toastr.success('Đã xóa sản phẩm khỏi giỏ hàng');
      this.loadLoggedInCustomerCart();
      this.loadTotal();
    })
  }

  showProduct(item: any) {
    this.route.navigateByUrl('product/' + item.productCode + '/' + item.productName);
  }

  loadTotal() {
    this.cartService.getAllCustomerCart().subscribe(response => {
      this.total = 0;
      for (let item of response) {
        this.total = this.total + item.price * item.quantity;
      }
    })
  }

  getProductColor(productCode: string) {
    this.productService.getProduct(productCode).subscribe(product => {
      this.productColors = product.productColors;
    })
  }

  changeItemColor(item: CartItem, colorCode: string) {
    this.changeCartItem(item.productCode, colorCode, item.quantity);
    this.cartService.adjustCartItem(this.cartUpdate).subscribe(() => {
      this.loadLoggedInCustomerCart();
    })
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity >= 2) {
      this.changeCartItem(item.productCode, item.colorCode, item.quantity--);
    }
  }

  increaseQuantity(item: CartItem) {
    this.changeCartItem(item.productCode, item.colorCode, item.quantity++);
  }

  update(action: string) {
    this.changeCartItem(this.cartUpdate.productCode, this.cartUpdate.colorCode,
       action == "inc" ? this.cartUpdate.quantity + 1 : this.cartUpdate.quantity - 1);
    this.cartService.adjustCartItem(this.cartUpdate).subscribe(() => {
      this.loadLoggedInCustomerCart();
    })
  }

  changeCartItem(productCode: string, colorCode: string, quantity: number) {
    this.cartUpdate = {
      productCode: productCode,
      colorCode: colorCode,
      quantity: quantity
    };
  }

  checkout() {
    this.route.navigateByUrl('check-out');
  }


}
