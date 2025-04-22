import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleType} from "../../../types/article.type";
import {environment} from "../../../environments/environment";
import {ActiveParamsType} from "../../../types/active-params.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getArticles(params: ActiveParamsType): Observable<{ count: number, pages: number, items: ArticleType[] }> {
    return this.http.get<{ count: number, pages: number, items: ArticleType[] }>(environment.api + 'articles', {
      params: params,
    });
  }

  getTopArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }
}
