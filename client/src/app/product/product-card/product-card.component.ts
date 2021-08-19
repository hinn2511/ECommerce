import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showDetail(productCode: string, productName: string){
    this.router.navigateByUrl('/product/' + productCode + '/' + productName);
  }

  addToCart(product: any) {
  }

}