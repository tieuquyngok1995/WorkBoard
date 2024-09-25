import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { GLOBAL } from '../constants/global';
import { CommonApiService } from './common-api.service';
import { AuthModel, UserModel } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userName!: string;
  private _auth: AuthModel = { isAuthenticated: false };

  constructor(private router: Router, private cookieService: CookieService, private commonApiService: CommonApiService) { }

  get auth(): AuthModel {
    const isLoggedIn = sessionStorage.getItem(GLOBAL.USER_NAME_TOKEN);

    if (isLoggedIn) this._auth = { isAuthenticated: true };

    return this._auth;
  }

  get userName(): string {
    if (!this._userName) this._userName = sessionStorage.getItem(GLOBAL.USER_NAME_TOKEN) ?? '';
    return this._userName;
  }

  public signIn(model: UserModel): Observable<boolean> {
    return this.commonApiService.post<UserModel>(this.commonApiService.urlSignIn, model).pipe(
      map(data => {
        if (data) {
          // save cookie auth
          this.cookieService.set(GLOBAL.AUTH_TOKEN, data.token, { secure: true, sameSite: 'Lax' });

          this._auth = { isAuthenticated: true };
          sessionStorage.setItem(GLOBAL.USER_NAME_TOKEN, data.userName);
          return true;
        } else {
          this._auth = { isAuthenticated: false };
          return false;
        }
      })
    );
  }

  public signUp(model: UserModel): Observable<boolean> {
    return this.commonApiService.post<UserModel>(this.commonApiService.urlSignUp, model).pipe(
      map(data => {
        if (data) {
          // save cookie auth
          this.cookieService.set(GLOBAL.AUTH_TOKEN, data.token, { secure: true, sameSite: 'Lax' });

          this._auth = { isAuthenticated: true };
          sessionStorage.setItem(GLOBAL.USER_NAME_TOKEN, data.userName);
          return true;
        } else {
          this._auth = { isAuthenticated: false };
          return false;
        }
      })
    );
  }

  public logOut(): void {
    sessionStorage.removeItem(GLOBAL.USER_NAME_TOKEN);
    this._auth = { isAuthenticated: false };

    this.router.navigate(['/login']);
  }
}
