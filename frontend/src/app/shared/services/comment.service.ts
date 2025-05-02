import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ActiveParamsCommentType} from "../../../types/active-params-comment.type";
import {CommentType} from "../../../types/comment.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {UserActionsType} from "../../../types/user-actions.type";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(params: ActiveParamsCommentType): Observable<{ allCount: number, comments: CommentType[] }> {
    return this.http.get<{ allCount: number, comments: CommentType[] }>(environment.api + 'comments', {
      params: params,
    });
  }

  addComment(text: string, article: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {text, article})
  }

  getActionsForArticleComments(articleId: string): Observable<DefaultResponseType | UserActionsType[]> {
    return this.http.get<DefaultResponseType | UserActionsType[]>(environment.api + 'comments/article-comment-actions', {
      params: {articleId},
    });
  }

  getActionsForComment(commentId: string): Observable<DefaultResponseType | UserActionsType[]> {
    return this.http.get<DefaultResponseType | UserActionsType[]>(environment.api + 'comments/' + commentId + '/actions' );
  }

  applyAction(commentId: string, action: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + commentId + '/apply-action' , {action})
  }
}
