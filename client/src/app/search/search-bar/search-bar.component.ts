import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchProductParams } from 'src/app/_models/searchProductParams';
import { SearchService } from 'src/app/_services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  keyWord = '';
  isSticky: boolean;
  
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }

  constructor(private router: Router, private searchService: SearchService) { }

  ngOnInit(): void {
  }

  search() {
    this.searchService.searchProductParams.categories = '';
    this.router.navigate(['/search'], { queryParams: { keyword: this.keyWord } });
  }

  clearKeyWord() {
    this.keyWord = '';
  }
}
