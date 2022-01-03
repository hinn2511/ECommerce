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
  pagination: Pagination;
  articleParams: ArticleParams;
  defaultThumbnailUrl = '../../assets/cover_5.jpg';

  constructor(private articleService: ArticleService) {
    this.articleParams = this.articleService.getArticleParams();
  }

  ngOnInit(): void {
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


  changeArticleOption(type: string) {
    if (this.articleParams.type != type) {
      this.articleParams.type = type;
      this.articleService.setArticleParams(this.articleParams);
      this.loadArticles();
    }
  }
  
  getCoverUrl(): string {
    switch (this.articleParams.type) {
      case 'news':
        return './../assets/new_advertise_cover.webp';
      case 'promotions':
        return './../assets/new_notify_cover.webp';
      default:
        return './../assets/new_all_cover.webp';
    }
  }

  getTitle(): string {
    switch (this.articleParams.type) {
      case 'news':
        return 'Thông báo mới';
      case 'promotions':
        return 'Tin khuyến mãi';
      default:
        return 'Tất cả tin tức';
    }
  }
}
