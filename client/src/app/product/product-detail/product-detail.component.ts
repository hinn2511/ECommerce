import { AfterContentInit, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { CartItemUpdate } from 'src/app/_models/cartItemUpdate';
import { Color } from 'src/app/_models/color';
import { Product } from 'src/app/_models/product';
import { CartService } from 'src/app/_services/cart.service';
import { FavoriteService } from 'src/app/_services/favorite.service';
import { ProductService } from 'src/app/_services/product.service';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, AfterContentInit {
  product: Product;
  itemsPerSlide = 0;
  relatedProducts: Product[] = [];
  colorChoosen: Color;
  quantity: number;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  productToCart: CartItemUpdate = {
    productCode: '',
    colorCode: '',
    quantity: 1
  };

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    if (window.innerWidth < 480)
      this.itemsPerSlide = 1;
    if (window.innerWidth > 480 && window.innerWidth < 990)
      this.itemsPerSlide = 2;
    if (window.innerWidth > 990)
      this.itemsPerSlide = 4;
  }

  constructor(private productService: ProductService,
    private route: ActivatedRoute, private router: Router,
    private toastr: ToastrService, private favoriteService: FavoriteService,
    private cartService: CartService) {
    this.getScreenSize();
  }
  
  ngOnInit(): void {
    //window.scroll(0,0);
    this.galleryOptions = [
      {
        width: '100%',
        height: '70vh',
        imagePercent: 100,
        imageSize: 'contain',
        thumbnailsColumns: 5,
        thumbnailsPercent: 20,
        previewCloseOnClick: true,
        thumbnailMargin: 1,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 1100,
        width: '40vw',
        height: '50vh',
        imagePercent: 100,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 480,
        width: '100%',
        height: '50vh',
        preview: true,

      }
    ];
    this.productToCart.productCode = this.route.snapshot.paramMap.get('code');
    this.getProduct();
  }

  
  ngAfterContentInit(): void {
    this.route.params
      .subscribe(params => {
        this.productToCart.productCode = params['code'];
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        }
        try {
          window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        } catch (e) {
          window.scrollTo(0, 0);
        }
        this.getProduct();

      });
  }

  getProduct() {
    this.productService.getProduct(this.productToCart.productCode).subscribe(product => {
      this.product = product;
      this.getRelatedProduct(this.product.productCode, this.product.category);
      if (product.productColors.length > 0) {
        this.productToCart.colorCode = product.productColors[0].colorCode;
        this.colorChoosen = product.productColors[0];
      }
      this.galleryImages = this.getImages();
    })
  }

  getRelatedProduct(productCode: string, category: string) {
    this.productService.getRelatedProducts(productCode, category).subscribe(result => {
      this.relatedProducts = result;
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
    if (this.productToCart.quantity >= 2)
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

  // goToProduct(productCode: string, productName: string){
  //   this.router.navigateByUrl('/product/' + productCode + '/' + productName);
  // }


}
