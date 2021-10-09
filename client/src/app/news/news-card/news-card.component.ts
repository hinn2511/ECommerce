import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/_models/article';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {
  @Input() article: Article;
  @Input() alignment: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewArticle(articleId: number ){
    this.router.navigateByUrl('/news/' + articleId);
  }
}
