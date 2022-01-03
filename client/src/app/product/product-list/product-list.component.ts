import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { ProductParams } from 'src/app/_models/productParams';
import { AreaService } from 'src/app/_services/area.service';
import { CategoryService } from 'src/app/_services/category.service';
import { redirectTo, selectSort } from 'src/app/_services/helper';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  thumbnailUrl = '';
  title = '';

  option = '';
  defaultValue = '';

  sort: string = "Mới nhất";

  pagination: Pagination;
  productParams: ProductParams;

  constructor(private productService: ProductService, private areaService: AreaService, private categoryService: CategoryService,
    private route: ActivatedRoute, private router: Router) {
    this.productParams = this.productService.getProductParams();
  }



  ngOnInit(): void {
    if (this.router.url.includes('sale')) {
      this.title = "Các sản phẩm khuyến mãi";
      this.option = 'sale';
      if (!this.productParams.sale) {
        this.productParams = this.productService.resetProductParams();
        this.productParams.sale = true;
      }
      this.thumbnailUrl = '../../assets/sale_cover.webp';
      this.defaultValue = 'true';
    }

    this.route.queryParams.subscribe(params => {
      let sc = params['subCategory']?.toLowerCase();
      if (sc != null) {
        this.title = sc;
        this.option = 'subCategory';
        if (sc != this.productParams.subCategory) {
          this.productParams = this.productService.resetProductParams();
          this.productParams.subCategory = sc;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        }
        this.defaultValue = sc;
        this.getThumbnailUrl(sc);
      }

      let kw = params['keyword']?.toLowerCase();
      if ( kw != null) {
        this.title = 'Kết quả tìm kiếm cho "' + kw + '"';
        this.option = 'search';
        if (kw != this.productParams.keyword) {
          this.productParams = this.productService.resetProductParams();
          this.productParams.keyword = kw;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        }
        this.defaultValue = kw;
        this.thumbnailUrl = '../../assets/sale_cover.webp';
      }
    });


    this.route.paramMap.subscribe((params: ParamMap) => {
      let category = params.get('category')?.toLowerCase();

      if (category != null) {
        this.title = category;
        this.option = 'category';
        if (category != this.productParams.category) {
          this.productParams = this.productService.resetProductParams();
          this.productParams.category = category;


          redirectTo(this.router, 'category/' + category);
        }
        this.defaultValue = category;
        this.getThumbnailUrl(category);
      }

      let area = params.get('area')?.toLowerCase();

      if (area != null) {
        this.title = area;
        this.option = 'area';
        if (area != this.productParams.area) {
          this.productParams = this.productService.resetProductParams();
          this.productParams.area = area;
          redirectTo(this.router, 'area/' + area);
        }
        this.defaultValue = area;
        this.getThumbnailUrl(area);
      }

    });
    console.log(this.productParams);
    this.loadProducts();
  }

  loadProducts() {
    this.productService.setProductParams(this.productParams);

    this.productService.getProducts(this.productParams).subscribe(response => {
      this.products = response.result;
      this.pagination = response.pagination;
    })
  }

  getThumbnailUrl(name: string) {
    if (this.option == 'category')
      this.categoryService.getAllCategories().subscribe(result => {
        this.thumbnailUrl = result.find(c => c.categoryName == name).photoUrl;
      });
    if (this.option == 'subCategory')
      this.categoryService.getAllCategories().subscribe(result => {
        let sc = result.find(result => result.subCategories.some(item => item.subCategoryName === name));
        this.thumbnailUrl = sc.subCategories.find(sc => sc.subCategoryName == name).photoUrl;
      });

    if (this.option == 'area')
      this.areaService.getAllAreas().subscribe(result => {
        this.thumbnailUrl = result.find(c => c.name == name).photoUrl;
      });
  }

  pageChanged(event: any) {
    if (this.productParams.pageNumber !== event.page) {
      this.productParams.pageNumber = event.page;
      this.productService.setProductParams(this.productParams);
      this.loadProducts();
    }
  }

  selectSort(type: string) {
    this.sort = selectSort(type);
  }

  filter(params: ProductParams) {
    this.productParams = params;
    this.loadProducts();
  }

  resetFilter() {
    this.productParams = this.productService.resetProductParams();
    this.loadProducts();
  }


}
