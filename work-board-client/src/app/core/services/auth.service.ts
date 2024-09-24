import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { CommonApiService } from './common-api.service';
import { AuthModel, UserModel } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userNameToken = 'userNameToken';
  private readonly userIDToken = 'userIDToken';

  private _userID!: number;
  private _userName!: string;
  private _auth: AuthModel = { isAuthenticated: false };

  constructor(private router: Router, private commonApiService: CommonApiService) { }

  get auth(): AuthModel {
    const isLoggedIn = sessionStorage.getItem(this.userNameToken);

    if (isLoggedIn) this._auth = { isAuthenticated: true };

    return this._auth;
  }

  get userID(): number {
    if (!this._userID) this._userID = Number(sessionStorage.getItem(this.userIDToken)) ?? -1;
    return this._userID;
  }

  get userName(): string {
    if (!this._userName) this._userName = sessionStorage.getItem(this.userNameToken) ?? '';
    return this._userName;
  }

  public signIn(model: UserModel): Observable<boolean> {
    return this.commonApiService.post<UserModel>(this.commonApiService.urlSignIn, model).pipe(
      map(data => {
        if (data) {
          sessionStorage.setItem(this.userNameToken, data.userName);
          sessionStorage.setItem(this.userIDToken, data.userID.toString());
          this._auth = { isAuthenticated: true };
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
          sessionStorage.setItem(this.userNameToken, data.userName);
          sessionStorage.setItem(this.userIDToken, data.userID.toString());
          this._auth = { isAuthenticated: true };
          return true;
        } else {
          this._auth = { isAuthenticated: false };
          return false;
        }
      })
    );
  }

  public logOut(): void {
    sessionStorage.removeItem(this.userNameToken);
    this._auth = { isAuthenticated: false };

    this.router.navigate(['/login']);
  }
}
