import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInfoType} from "../../../types/user-info.type";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo(text?: string, article?: string): Observable<UserInfoType | DefaultResponseType> {
    const options = (text && article)
      ? { body: { text, article } }
      : {};

    return this.http.request<UserInfoType | DefaultResponseType>('GET', environment.api + 'users', options);
  }

}
