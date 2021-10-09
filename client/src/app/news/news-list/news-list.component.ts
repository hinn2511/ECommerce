import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/_models/article';
import { ArticleParams } from 'src/app/_models/articleParams';
import { Pagination } from 'src/app/_models/pagination';
import { ArticleService } from 'src/app/_services/article.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  articles: Article[];
  category: string;
  type: string;
  pagination: Pagination;
  articleParams: ArticleParams;

  constructor(private articleService: ArticleService) {
    this.articleParams = this.articleService.getArticleParams();
  }

  ngOnInit(): void {
    this.type = 'Tin tức mới nhất';
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getArticles(this.articleParams).subscribe(response => {
      this.articles = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    if (this.articleParams.pageNumber !== event.page) {
      this.articleParams.pageNumber = event.page;
      this.articleService.setArticleParams(this.articleParams);
      this.loadArticles();
    }
  }

  articleToggle(type: string) {
    switch (this.articleParams.type) {
      case 'news': {
        if (type != 'news') {
          this.type = 'Tin khuyến mãi';
          this.articleParams.type = 'promotions';
          this.articleService.setArticleParams(this.articleParams);
          this.loadArticles();
        }
        break;
      }
      case 'promotions': {
        if (type != 'promotions') {
          this.type = 'Tin tức mới nhất';
          this.articleParams.type = 'news';
          this.articleService.setArticleParams(this.articleParams);
          this.loadArticles();
        }
        break;

      }
    }
  }

  getHeaderImage(): string {
    return "'" + this.articles[0].thumbnailPhotoUrl + "'";
  }
}
