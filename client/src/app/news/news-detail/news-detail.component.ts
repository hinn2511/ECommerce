import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/_models/article';
import { ArticleService } from 'src/app/_services/article.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  artcicle: Article;
  relatedArticles: Article[] = [];
  id: number;

  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService) {
   }

  ngOnInit(): void {
    window.scroll(0,0);
    let temp = this.route.snapshot.paramMap.get('id');
    this.id = +temp;
    this.getArtcicle(this.id);
  }

  getArtcicle(id: number) {
    this.articleService.getArticle(id).subscribe(article => {
      this.artcicle = article;
      this.getRelatedArticle(this.artcicle.id, this.artcicle.type);
    });
  }

  getRelatedArticle(id: number, type: number) {
    this.articleService.getRelatedArticle(id, type).subscribe(relatedArticles => {
      this.relatedArticles = relatedArticles;
    });
  }

  returnTo(type: number) {
    switch (type) {
      case 1: 
        this.articleService.articleParams.type = 'news';
        break;
      case 2:
        this.articleService.articleParams.type = 'promotions';
        break;
    }
    this.router.navigateByUrl('/news');
  }
  
}
