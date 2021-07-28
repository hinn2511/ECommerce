import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavbarComponent implements OnInit {
  collapse = false;
  search = false;
  items: string[] = [
    'Dress',
    'Shirt',
    'T-shirt',
    'Shoe',
    'Dress',
    'Shirt',
    'T-shirt',
    'Shoe'
  ];

  constructor() { }

  ngOnInit(): void {
    this.collapse = false;
    this.search = false;
  }

  navigationBarToggle() {
    this.collapse = !this.collapse;
  }

  searchBarToggle() {
    this.search = !this.search;
  }

}
