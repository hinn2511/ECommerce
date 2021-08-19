import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Color } from 'src/app/_models/color';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  colorChoosen: string;
  productCode: string = '';
  productName: string = '';
  colors: Color[] = [];
  colorList: string = '';
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];



  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '45rem',
        height: '45rem',
        imagePercent: 100,
        imageSize: 'contain',
        thumbnailsColumns: 5,
        previewCloseOnClick: true,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 1100,
        width: '25rem',
        height: '30rem',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 480,
        width: '100%',
        height: '21.5rem',
        preview: true,

      }
    ];
    this.getProduct();


  }

  getProduct() {
    this.productCode = this.route.snapshot.paramMap.get('code');
    this.productName = this.route.snapshot.paramMap.get('name');
    this.productService.getProduct(this.productCode, this.productName).subscribe(product => {
      this.product = product;
      this.colors = this.getProductColors();
      this.galleryImages = this.getImages();
      console.log(this.colors);
    })
  }

  getProductColors(): Color[] {
    const productColors = [];
    for (const color of this.product.colors) {
      productColors.push({
        hexCode: color?.hexCode,
        colorCode: color?.colorCode,
        colorName: color?.colorName
      })
      if (this.colorList === '')
        this.colorList = this.colorList + this.capitalize(color?.colorName);
      else
        this.colorList = this.colorList + ', ' + this.capitalize(color?.colorName);
    }
    return productColors;
  }

  capitalize(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.product.productPhotos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  chooseColor(color: any) {
    this.colorChoosen = color.colorName;
  }

}
