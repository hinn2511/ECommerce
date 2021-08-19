import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Green food';
  searchMode = false;
  showContent: boolean;
  template = "<img src='../../assets/loading.gif'/>"
  
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
