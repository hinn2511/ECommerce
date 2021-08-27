import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/_models/color';
import { Product } from 'src/app/_models/product';
import { FavoriteService } from 'src/app/_services/favorite.service';
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



  constructor(private productService: ProductService, 
    private route: ActivatedRoute, private toastr: ToastrService,
    private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '45rem',
        height: '30rem',
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
    this.productService.getProduct(this.productCode).subscribe(product => {
      this.product = product;
      this.galleryImages = this.getImages();
    })
    this.productService.getProductColors(this.productCode).subscribe(colors => {
      this.colors = colors;
      this.getProductColors();
    })
  }

  getProductColors(): Color[] {
    const productColors = [];
    for (const color of this.colors) {
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

  addToFavorite(product: Product) {
    this.favoriteService.addToFavorite(product.productCode).subscribe(() => {
      this.toastr.success('Đã thêm ' + product.productName +' vào yêu thích');
    })
  }

}
