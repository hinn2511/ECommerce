import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { delay, takeUntil } from 'rxjs/operators';
import { CartItem } from 'src/app/_models/cartItem';
import { Color } from 'src/app/_models/color';
import { Pagination } from 'src/app/_models/pagination';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: CartItem[] = [];
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;
  total = 0;
  productColors: Color[] = [];
  quantity = 0;
  productCode = "";
  colorCode = "";

  constructor(private cartService: CartService, private toastr: ToastrService, private route: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.loadCustomerCart();

  }

  loadCustomerCart() {
    this.cartService.getCustomerCart(this.pageNumber, this.pageSize).subscribe(response => {
      this.carts = response.result;
      this.pagination = response.pagination;
      this.loadTotal();
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadCustomerCart();
    }
  }

  removeFromCart(productCode: string) {
    this.cartService.removeCartItem(productCode).subscribe(() => {
      this.toastr.success('Đã xóa sản phẩm khỏi giỏ hàng');
      this.loadCustomerCart();
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
    this.productColors = [];
    this.productService.getProductColors(productCode).subscribe(colors => {
      this.productColors = colors;
    })
  }

  changeItemColor(item: CartItem, colorCode: string) {
    var updatedItem = {
      colorCode: colorCode,
      productCode: item.productCode,
      quantity: item.quantity
    }
    this.cartService.adjustCartItem(updatedItem).subscribe(() => {
      this.loadCustomerCart();
    })
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity >= 2) {
      this.productCode = item.productCode;
      this.colorCode = item.colorCode;
      this.quantity = item.quantity--;
    }
  }

  increaseQuantity(item: CartItem) {
      this.productCode = item.productCode;
      this.colorCode = item.colorCode;
      this.quantity = item.quantity++;
  }

  update(action: string) {
    var updatedItem = {
      colorCode: this.colorCode,
      productCode: this.productCode,
      quantity: action == "inc" ? this.quantity + 1 : this.quantity - 1
    }
    this.cartService.adjustCartItem(updatedItem).subscribe(() => {
      this.loadCustomerCart();
    })
  }

  checkout() {
    this.route.navigateByUrl('check-out');
  }


}
