import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  keyWord = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search() {
    this.router.navigate(['/search'], { queryParams: { keyword: this.keyWord } });
  }

  clearKeyWord() {
    this.keyWord = '';
  }
}
