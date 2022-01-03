import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  keyWord = '';
  validated = false;
  isSticky: boolean;
  
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search() {
    if (this.keyWord.length > 0)
      this.router.navigate(['/search'], { queryParams: { keyword: this.keyWord } });
  }

  clearKeyWord() {
    this.keyWord = '';
  }
}
