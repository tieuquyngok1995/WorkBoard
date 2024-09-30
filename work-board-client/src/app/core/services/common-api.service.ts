import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { GLOBAL } from '../constants/global';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  public urlSignIn = 'Login/SignIn';
  public urlSignUp = 'Login/SignUp';
  public urlGetIndex = 'Home/GetIndex';
  public urlCreateTask = 'Task/CreateTask';
  public urlUpdateTask = 'Task/UpdateTask';
  public urlUpdateTaskStatus = 'Task/UpdateTaskStatus';
  public urlUpdateTaskProgress = 'Task/UpdateTaskProgress';
  public urlDeleteTask = 'Task/DeleteTask';

  constructor(@Inject('API_URL') private apiUrl: string, private http: HttpClient, private cookieService: CookieService) { }

  // Method to make GET request
  get<T>(url: string, params?: { [key: string]: any }): Observable<T> {
    let httpParams = new HttpParams();

    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }

    const header = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get(GLOBAL.AUTH_TOKEN));
    return this.http.get<T>(this.apiUrl + url, { headers: header, params: httpParams });
  }

  // Method to make POST request
  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + url + '/', body);
  }

  // Method to make PUT request
  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.apiUrl + url + '/', body);
  }

  // Method to make DELETE request
  delete<T>(url: string, params?: { [key: string]: any }): Observable<T> {
    let httpParams = new HttpParams();

    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }

    return this.http.delete<T>(this.apiUrl + url + '/', { params: httpParams });
  }
}