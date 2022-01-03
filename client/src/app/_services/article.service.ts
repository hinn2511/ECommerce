import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Article } from '../_models/article';
import { ArticleParams } from '../_models/articleParams';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseUrl = environment.apiUrl;
  articleParams: ArticleParams;
  articleCache = new Map();
  lastReadArticle: number;

  getLastReadArticle(): number {
    return this.lastReadArticle;
  }

  setLastReadArticle(value: number) {
    this.lastReadArticle = value;
  }

  constructor(private http: HttpClient) {
    this.articleParams = new ArticleParams();
  }

  getArticleParams() {
    return this.articleParams;
  }

  setArticleParams(params: ArticleParams) {
    this.articleParams = params;
  }

  resetArticleParams() {
    this.articleParams = new ArticleParams();
    return this.articleParams;
  }

  getArticles(articleParams: ArticleParams) {
    let params = getPaginationHeaders(articleParams.pageNumber, articleParams.pageSize);
    params = params.append('type', articleParams.type);
    return getPaginatedResult<Article[]>(this.baseUrl + 'article', params, this.http).pipe(
      map(response => {
        this.articleCache.set(Object.values(articleParams).join('-'), response);
        return response; 
      })
    );
  }

  getArticle(id: number) {
    const article = [...this.articleCache.values()]
      .reduce((arr, elm) => arr.concat(elm.result), [])
      .find((article: Article) => article.id === id);
    if (article) {
      return of(article);
    }
    return this.http.get<Article>(this.baseUrl + 'article/' + id);
  }

  getRelatedArticle(id: number, type: number) {
    const article = [...this.articleCache.values()]
      .reduce((arr, elm) => arr.concat(elm.result), [])
      .filter((article: Article) => article.id !== id && article.type == type)
      .slice(0,2);
    if (article.length > 1) {
      return of(article);
    }
    return this.http.get<Article[]>(this.baseUrl + 'article/related/' + id);
  }

}
