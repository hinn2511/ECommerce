import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { CartItemUpdate } from 'src/app/_models/cartItemUpdate';
import { Color } from 'src/app/_models/color';
import { Product } from 'src/app/_models/product';
import { CartService } from 'src/app/_services/cart.service';
import { FavoriteService } from 'src/app/_services/favorite.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  colorChoosen: Color;
  quantity: number;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  productToCart: CartItemUpdate = {
    productCode: '',
    colorCode: '',
    quantity: 1
  };


  constructor(private productService: ProductService,
    private route: ActivatedRoute, private toastr: ToastrService,
    private favoriteService: FavoriteService, private cartService: CartService) { }

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
    this.productToCart.productCode = this.route.snapshot.paramMap.get('code');
    this.getProduct();

  }

  getProduct() {
    this.productService.getProduct(this.productToCart.productCode).subscribe(product => {
      this.product = product;
      if (product.productColors.length > 0) {
        this.productToCart.colorCode = product.productColors[0].colorCode;
        this.colorChoosen = product.productColors[0];
      }
      this.galleryImages = this.getImages();
    })
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

  chooseColor(color: Color) {
    this.colorChoosen = color;
    this.productToCart.colorCode = color.colorCode;
  }

  addToFavorite(product: Product) {
    this.favoriteService.addToFavorite(product.productCode).subscribe(() => {
      this.toastr.success('Đã thêm ' + product.productName + ' vào yêu thích');
    })
  }

  decreaseQuantity() {
    if ( this.productToCart.quantity >= 2)
      this.productToCart.quantity = this.productToCart.quantity - 1;
  }

  increaseQuantity() {
    this.productToCart.quantity = this.productToCart.quantity + 1;
  }

  addToCart() {
    this.cartService.addCartItem(this.productToCart).subscribe(() => {
      this.productToCart.quantity = 1;
      this.toastr.success('Đã thêm ' + this.product.productName + ' vào giỏ hàng');
    }, error => {
      this.toastr.error('Đã có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
    });
  }




}
