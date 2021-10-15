import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from './_models/cartItem';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { CartService } from './_services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  searchMode = false;
  showContent: boolean;
  carts: CartItem[];
  isSticky: boolean;
  
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }
  
  constructor(private accountService : AccountService, public router: Router) {
  }

  ngOnInit() {
    this.showContent = true;
    this.setCurrentUser();
    
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.accountService.setCurrentUser(user);
    }
    
  }

  showSearchBarMobile(event: boolean){
    this.searchMode = event;
  }

  hideContent(event: boolean){
    this.showContent = event;
  }

  
}
