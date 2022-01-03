import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Area } from 'src/app/_models/area';
import { Category, SubCategory } from 'src/app/_models/categories';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { ProductParams } from 'src/app/_models/productParams';
import { AreaService } from 'src/app/_services/area.service';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input() productParams: ProductParams;
  @Input() option: string;
  @Input() defaultValue: string;

  param: ProductParams;

  areas: Area[] = [];
  categories: Category[];
  subCategories: SubCategory[] = [];
  filter: string[] = [];
  salePercents: number[] = [50, 30, 20, 10];
  
  isSticky: boolean;
  hideFilter: boolean;
  filtered: boolean = false;

  @Output() filterParams = new EventEmitter<ProductParams>();

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 600;
  }

  constructor(private productService: ProductService,
    private categoryService: CategoryService, private areaService: AreaService, private router: Router) {
      this.param = this.productService.getProductParams();
  }

  ngOnInit(): void {
    this.param = this.productParams;
    switch (this.option) {
      case 'search':
        this.filter.push('category');
        this.filter.push('area');
        this.loadSubCategories('');
        break;
      case 'category':
        this.filter.push('subCategory');
        this.filter.push('area');
        this.loadSubCategories(this.param.category);
        break;

      case 'area':
        this.filter.push('category');
        this.loadSubCategories('');
        break;

      case 'sale':
        this.filter.push('category');
        this.filter.push('area');
        this.loadSubCategories('');
        break;

      case 'subCategory':
        this.filter.push('area');
        break;  

      }
      this.loadAreas();
      this.hideFilter = true;
  }

  filterOn(type: string): boolean {
    if (this.filter.indexOf(type) > -1)
      return true;
    return false;
  }

  loadAreas() {
    this.areaService.getAllAreas().subscribe(result => {
      this.areas = result;
    })
  }

  loadSubCategories(categoryName: string) {
    this.categoryService.getAllCategories().subscribe(result => {
      this.categories = result;
      if (categoryName != '')
        this.subCategories = this.categories.find(c => c.categoryName == categoryName).subCategories;
    })
  }

  filterProduct() {
    this.filtered = true;
    this.filterParams.emit(this.param);
  }

  resetFilter() {
    this.param = this.productService.resetProductParams();
    switch (this.option) {
      case 'search':
        this.param.keyword = this.defaultValue;
        break;
      case 'category':
        this.param.category = this.defaultValue;
        break;
      case 'area':
        this.param.area = this.defaultValue;
        break;
      case 'subCategory':
        this.param.subCategory = this.defaultValue;
        break;
      case 'sale':
        this.param.saleUpTo = 100;
        break;
    }
    this.filtered = false;
    this.filterProduct();
  }

  choose(type: string, value: any) {
      switch (type) {
        case 'area': {
          this.param.area = value;
          break;
        }
        case 'category': {
          this.param.category = value;
          break;
        }
        case 'subCategory': {
          this.param.subCategory = value;
          break;
        }
        case 'saleUpTo': {
          this.param.saleUpTo = value;
          break;
        }
      }
      this.filtered = true;
      this.filterProduct();
    }

  filterToggle() {
    this.hideFilter = !this.hideFilter;
  }
}
