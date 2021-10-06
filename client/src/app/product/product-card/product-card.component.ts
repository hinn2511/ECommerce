import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { concatMap, switchMap } from 'rxjs/operators';
import { CartItem } from 'src/app/_models/cartItem';
import { Color } from 'src/app/_models/color';
import { Product } from 'src/app/_models/product';
import { CartService } from 'src/app/_services/cart.service';
import { FavoriteService } from 'src/app/_services/favorite.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  cartItem: any;
  colors: Color[];

  constructor(private router: Router,
    private favoriteService: FavoriteService, private cartService: CartService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  showDetail(productCode: string, productName: string) {
    this.router.navigateByUrl('/product/' + productCode + '/' + productName);
  }


  addToFavorite(product: Product) {
    this.favoriteService.addToFavorite(product.productCode).subscribe(() => {
      this.toastr.success('Đã thêm ' + product.productName + ' vào yêu thích');
    })
  }

  addToCart(product: Product) {
    this.cartItem = {
      productCode: product.productCode,
      colorCode: product.productColors[0] != undefined ? product.productColors[0].colorCode : null,
      quantity: 1
    }
    this.cartService.addCartItem(this.cartItem).subscribe(() => {
      this.toastr.success('Đã thêm ' + product.productName + ' vào giỏ hàng');
    }, error => {
      this.toastr.error('Đã có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
    });
  }

}
