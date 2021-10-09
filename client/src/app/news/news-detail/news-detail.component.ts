import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/_models/article';
import { ArticleService } from 'src/app/_services/article.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  artcicle: Article;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit(): void {
    var temp = this.route.snapshot.paramMap.get('id');
    var id: number = +temp;
    this.getArtcicle(id) ;
  }

  getArtcicle(id: number) {
    this.articleService.getArticle(id).subscribe(article => {
      this.artcicle = article;
    })
  }
}
