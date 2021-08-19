import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AccountService } from '../_services/account.service';

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

  constructor(public accountService: AccountService, public router: Router) {
    
  }

  ngOnInit(): void {
    this.collapse = true;
    this.search = false;
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

  

}
