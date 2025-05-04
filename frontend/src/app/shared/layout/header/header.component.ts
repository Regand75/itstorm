import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UserInfoType} from "../../../../types/user-info.type";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  userInfo: UserInfoType | null = null;
  currentUrl: string = '';

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private userService: UserService,
              private router: Router) {
    this.isLogged = this.authService.getIsLoggedIn();
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

  ngOnInit(): void {
    if (this.authService.getIsLoggedIn()) {
      this.isLogged = true;
      this.loadUserInfo();
    }

    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;

      if (isLoggedIn) {
        this.loadUserInfo();
      } else {
        this.userInfo = null;
      }
    });
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      });
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }

  private loadUserInfo(): void {
    this.userService.getUserInfo().subscribe((data: UserInfoType | DefaultResponseType) => {
      if ((data as DefaultResponseType).error !== undefined) {
        throw new Error((data as DefaultResponseType).message);
      }
      this.userInfo = data as UserInfoType;
    });
  }

}
