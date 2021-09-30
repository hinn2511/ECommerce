import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  backgroungImageDesktop = '../../assets/cover_1.jpg';
  backgroungImageMobile = '../../assets/homepage-cover-mobile.jpg';
  intro = 'Thay đổi cuộc sống của bạn';
  content = 'Bộ sưu tập nội thất Minimal';
  btnContent = 'Xem ngay';

  constructor() { }

  ngOnInit(): void {
  }

}
