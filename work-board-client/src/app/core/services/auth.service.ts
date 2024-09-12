import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

import { CommonApiService } from './common-api.service';
import { AuthModel, UserModel } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authToken = 'authToken';

  private _userName!: string;
  private _auth: AuthModel = { isAuthenticated: false };

  constructor(private router: Router, private commonApiService: CommonApiService) { }

  get auth(): AuthModel {
    const isLoggedIn = sessionStorage.getItem(this.authToken);

    if (isLoggedIn) this._auth = { isAuthenticated: true };

    return this._auth;
  }

  get userName(): string {
    if (!this._userName) this._userName = sessionStorage.getItem(this.authToken) ?? '';
    return this._userName;
  }

  signIn(username: string, password: string): Observable<boolean> {

    return this.commonApiService.get<UserModel>(this.commonApiService.urlSignIn, { username, password }).pipe(
      map(data => {
        if (data) {
          sessionStorage.setItem(this.authToken, data.userName);
          this._userName = data.userName;
          this._auth = { isAuthenticated: true };
          return true;
        } else {
          this._auth = { isAuthenticated: false };
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  signUp(model: UserModel): Observable<boolean> {

    return this.commonApiService.post<UserModel>(this.commonApiService.urlSignUp, model).pipe(
      map(data => {
        if (data) {
          sessionStorage.setItem(this.authToken, data.userName);
          this._userName = data.userName;
          this._auth = { isAuthenticated: true };
          return true;
        } else {
          this._auth = { isAuthenticated: false };
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  logOut(): void {
    sessionStorage.removeItem(this.authToken);
    this._auth = { isAuthenticated: false };

    this.router.navigate(['/login']);
  }
}
