import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  headerImgUrl = '../../assets/cover_5.jpg';
  introductImg1 = '../../assets/introduce_3.jpg';
  introductImg2 = '../../assets/introduce_4.jpg';
  categoryImg1 = '../../assets/category_1.jpg';
  categoryImg2 = '../../assets/category_2.jpg';
  categoryImg3 = '../../assets/category_3.jpg';
  categoryImg4 = '../../assets/category_4.jpg';
  introduceContent ='Furniture orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper malesuada proin libero nunc. Risus quis varius quam quisque. Non enim praesent elementum facilisis leo vel fringilla est. Laoreet non curabitur  gravida arcu ac tortor dignissim.'
  constructor() { }

  ngOnInit(): void {
  }

  getHeaderImageUrl(): string {
    return 'linear-gradient( 0deg, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.4) 90%), url('+ this.headerImgUrl + ')';
  }

}
