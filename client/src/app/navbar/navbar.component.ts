import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Observable, ReplaySubject } from 'rxjs';
import { Category, SubCategory } from '../_models/categories';
import { AccountService } from '../_services/account.service';
import { CartService } from '../_services/cart.service';
import { CategoryService } from '../_services/category.service';
import { urlContain } from '../_services/helper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavbarComponent implements OnInit {
  @Output() showSearchBar = new EventEmitter();
  @Output() navBarOpen = new EventEmitter();
  collapse = false;
  search = false;
  categoryDropDownImage = '';
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  
  categoryDropdown = true;
  
  recommendCategory: { id: number, name: string, type: string }[] = [
    { "id": 0, "name": "đèn", "type": "category" },
    { "id": 1, "name": "trang trí lễ hội", "type": "category" },
    { "id": 2, "name": "bàn làm việc", "type": "subCategory" },
    { "id": 3, "name": "giường đôi", "type": "subCategory" },
    { "id": 4, "name": "nội thất phòng khách", "type": "area" },
    { "id": 5, "name": "ghế sofa", "type": "subCategory" },
    { "id": 6, "name": "cây cảnh", "type": "category" },
    { "id": 7, "name": "gương", "type": "subCategory" },
    { "id": 8, "name": "tranh treo tường", "type": "subCategory" },
    { "id": 9, "name": "thiết bị vệ sinh", "type": "subCategory" },
    { "id": 9, "name": "sản phẩm khuyến mãi", "type": "sale" }
  ];

  hoveredCategory: Category = {
    id: 0,
    categoryName: '',
    subCategories: [],
    photoUrl: ''
  };

  isSticky: boolean;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }

  constructor(public accountService: AccountService, 
    public cartService: CartService, private router: Router, 
    private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.collapse = true;
    this.search = false;
    this.loadAllCategories();
    this.hoveredCategory.id = 0;
  }

  navigationBarToggle() {
    this.collapse = !this.collapse;
    this.navBarOpen.emit(this.collapse);
  }

  hideCategoryDropdown(value: boolean) {
      this.categoryDropdown = value;
  }

  hideMenuToggle() {
    this.collapse = true;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.cartService.refreshCartQuantity();
  }

  showSearchBarToggle() {
    this.search = !this.search;
    this.showSearchBar.emit(this.search);
  }

  loadAllCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  getSubCategories(category: Category): SubCategory[] {
    const subCategories = [];
    for (const subCategory of category.subCategories) {
      subCategories.push({
        id: subCategory.id,
        subCategoryName: subCategory.subCategoryName,
        photoUrl: subCategory.photoUrl
      })
    }
    return subCategories;
  }

  loadSubCategories(category: Category) {
    if (this.hoveredCategory.id != category.id) {
      this.subCategories = this.getSubCategories(category);
      this.hoveredCategory = category;
    }
    this.categoryDropDownImage = this.hoveredCategory.photoUrl;
  }

  loadSubCategoryImage(subCategory: SubCategory) {
    this.categoryDropDownImage = subCategory.photoUrl;
  }

  displayIn(uriList: string[]): boolean {
    return urlContain(this.router, uriList);
  }

  gotoCategory(category: any) {
    switch (category.type) {
      case 'category':
        this.router.navigateByUrl('/category/' + category.name);
        break;
      case 'subCategory':
        this.router.navigate(['/category'], { queryParams: { subCategory: category.name } });
        break;
      case 'area':
          this.router.navigateByUrl('/area/' + category.name);
          break;
      case 'sale':
          this.router.navigateByUrl('/sale');
          break;
    }
  }

}
