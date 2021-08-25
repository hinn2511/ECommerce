import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor(private router: Router, private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  showDetail(productCode: string, productName: string){
    this.router.navigateByUrl('/product/' + productCode + '/' + productName);
  }

  addToCart(product: any) {
  }

  addToFavorite(product: Product) {
    this.productService.addToFavorite(product.productCode).subscribe(() => {
      this.toastr.success('Đã thêm ' + product.productName +' vào yêu thích');
    })
  }

}
