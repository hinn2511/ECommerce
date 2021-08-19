import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  backgroungImageDesktop = '../../assets/homepage-cover-desktop.jpg';
  backgroungImageMobile = '../../assets/homepage-cover-mobile.jpg';
  intro = 'Bộ sưu mới 2021';
  content = 'Minimalist Design';
  btnContent = 'Xem chi tiết';

  constructor() { }

  ngOnInit(): void {
  }

}
