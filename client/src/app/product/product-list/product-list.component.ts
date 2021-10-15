import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { ProductParams } from 'src/app/_models/productParams';
import { CategoryService } from 'src/app/_services/category.service';
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

  sort: string = "Mới nhất";

  pagination: Pagination;
  productParams: ProductParams;

  constructor(private productService: ProductService, private categoryService: CategoryService,
    private route: ActivatedRoute, private router: Router) {
    this.productParams = this.productService.getProductParams();
  }



  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let category = params.get('category')?.toLowerCase();

      if (category != null) {
        this.title = category;
        if (category != this.productParams.category) {
          this.productParams = this.productService.resetProductParams();
          this.productParams.category = category;
          this.redirectTo('category/' + category);
        }
      }
      this.getThumbnailUrl(category);
    });

    this.loadProducts();
  }

  loadProducts() {
    this.productService.setProductParams(this.productParams);

    this.productService.getProducts(this.productParams).subscribe(response => {
      this.products = response.result;
      this.pagination = response.pagination;
    })
  }

  getThumbnailUrl(categoryName: string) {
    this.categoryService.getAllCategories().subscribe(result => {
      this.thumbnailUrl =  result.find(c => c.categoryName == categoryName).photoUrl;
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
    if (type == "newest")
      this.sort = "Mới nhất";
    if (type == "highestPrice")
      this.sort = "Giá từ cao xuống thấp";
    if (type == "lowestPrice")
      this.sort = "Giá từ thấp đến cao";
    if (type == "salePercent")
      this.sort = "Giảm giá nhiều";
  }

  filter(params: ProductParams) {
    this.productParams = params;
    this.loadProducts();
  }

  resetFilter() {
    this.productParams = this.productService.resetProductParams();
    this.loadProducts();
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }


}
