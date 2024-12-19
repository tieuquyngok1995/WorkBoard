import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, of } from 'rxjs';

import { GLOBAL } from '../constants/global';
import { AuthModel, UserModel } from '../model/model';
import { CommonApiService } from './common-api.service';
import { WebsocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _roleID!: number;
  private _userID!: number;
  private _userName!: string;
  private _auth: AuthModel = { isAuthenticated: false };

  /**
   * A constructor initializes a class's objects upon creation.
   * @param router 
   * @param cookieService 
   * @param commonApiService 
   * @param websocketService 
   */
  constructor(
    private readonly router: Router,
    private readonly cookieService: CookieService,
    private readonly commonApiService: CommonApiService,
    private readonly websocketService: WebsocketService) {
  }

  /**
   * Get authenticated.
   */
  get auth(): AuthModel {
    const isLoggedIn = sessionStorage.getItem(GLOBAL.USER_NAME_TOKEN);

    if (isLoggedIn) this._auth = { isAuthenticated: true };

    return this._auth;
  }

  /**
   * Get role user .
   */
  get roleID(): number {
    if (!this._roleID) this._roleID = Number(sessionStorage.getItem(GLOBAL.ROLE_ID_TOKEN));
    return this._roleID;
  }

  /**
   * Get user id login.
   */
  get userID(): number {
    if (!this._userID) this._userID = Number(sessionStorage.getItem(GLOBAL.USER_ID_TOKEN));
    return this._userID;
  }

  /**
   * Get name user login
   */
  get userName(): string {
    if (!this._userName) this._userName = sessionStorage.getItem(GLOBAL.USER_NAME_TOKEN) ?? '';
    return this._userName;
  }

  /**
   * Handle user login.
   * @param model 
   * @returns 
   */
  public signIn(model: UserModel): Observable<boolean> {
    return this.commonApiService.get<UserModel>(this.commonApiService.urlSignIn, model).pipe(
      map(data => {
        if (data) {
          // save cookie auth
          this.cookieService.set(GLOBAL.AUTH_TOKEN, data.token, { secure: true, sameSite: 'Lax' });
          this._auth = { isAuthenticated: true };

          this._roleID = data.roleID;
          sessionStorage.setItem(GLOBAL.ROLE_ID_TOKEN, this._roleID.toString());

          this._userID = data.userID;
          sessionStorage.setItem(GLOBAL.USER_ID_TOKEN, this._userID.toString());

          this._userName = data.userName;
          sessionStorage.setItem(GLOBAL.USER_NAME_TOKEN, this._userName);

          return true;
        } else {
          this._auth = { isAuthenticated: false };
          return false;
        }
      },
        catchError(() => { return of(false) }))
    );
  }

  /**
   * Process new user registration.
   * @param model 
   * @returns 
   */
  public signUp(model: UserModel): Observable<boolean> {
    return this.commonApiService.post<UserModel>(this.commonApiService.urlSignUp, model).pipe(
      map(data => {
        if (data) {
          // save cookie auth
          this.cookieService.set(GLOBAL.AUTH_TOKEN, data.token, { secure: true, sameSite: 'Lax' });

          this._auth = { isAuthenticated: true };

          this._roleID = data.roleID;
          sessionStorage.setItem(GLOBAL.ROLE_ID_TOKEN, this._roleID.toString());

          this._userID = data.userID;
          sessionStorage.setItem(GLOBAL.USER_ID_TOKEN, this._userID.toString());

          this._userName = data.userName;
          sessionStorage.setItem(GLOBAL.USER_NAME_TOKEN, this._userName);

          return true;
        } else {
          this._auth = { isAuthenticated: false };
          return false;
        }
      },
        catchError(() => { return of(false) }))
    );
  }

  /**
   * Log out handling.
   */
  public logOut(): void {
    sessionStorage.removeItem(GLOBAL.USER_NAME_TOKEN);
    this._auth = { isAuthenticated: false };

    this.websocketService.closeConnection(this.commonApiService.wsConnect);

    this.router.navigate(['/login']);
  }
}