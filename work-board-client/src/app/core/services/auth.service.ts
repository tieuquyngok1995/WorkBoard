import { Injectable } from '@angular/core';
import { AuthModel, UserModel } from '../model/model';
import { CommonApiService } from './common-api.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth: AuthModel = { isAuthenticated: false };

  get auth(): AuthModel {
    return this._auth;
  }

  constructor(private commonApiService: CommonApiService) { }

  login(username: string, password: string): Observable<boolean> {
    const url = 'Login/GetLogin';
    const body = { username, password };

    return this.commonApiService.get<UserModel>(url, body).pipe(
      map(data => {
        if (data) {
          localStorage.setItem('authToken', data.userName);
          this._auth = { isAuthenticated: true, userName: data.userName };
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

  logout(): void {
    localStorage.removeItem('authToken');
    this._auth = { isAuthenticated: false };
  }
}
