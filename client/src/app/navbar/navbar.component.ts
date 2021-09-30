import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Category, SubCategory } from '../_models/categories';
import { AccountService } from '../_services/account.service';
import { CategoryService } from '../_services/category.service';

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
  backgroungImage = 'https://images.dunelm.com/30464461.jpg?$standardplayerdefault$&img404=noimagedefault';
  backgroungImage2 = 'https://thhome.vn/wp-content/uploads/2021/04/industrial-style-living-room-interior-with-furniture-sofa-1.jpg';
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  categoryItem: string[] = [
    'Bàn',
    'Ghế',
    'Đèn',
    'Giường',
    'Tủ',
    'Kệ',
    'Tác phẩm nghệ thuật',
    'Các loại cây cảnh',
    'Tất cả sản phẩm'
  ];

  spaceItem: string[] = [
    'Phòng khách',
    'Nhà bếp',
    'Phòng ngủ',
    'Phòng làm việc',
    'Nhà vệ sinh',
    'Sân vườn'
  ];
  hoveredCategory: Category = {
    id: 0,
    categoryName: '',
    subCategories: [],
    photoUrl: ''
  };

  constructor(public accountService: AccountService, public router: Router, private categoryService: CategoryService) {

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


  hideMenuToggle() {
    this.collapse = true;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
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

}
