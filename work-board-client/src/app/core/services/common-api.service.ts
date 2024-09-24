import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  public urlSignIn = 'Login/SignIn';
  public urlSignUp = 'Login/SignUp';
  public urlGetIndex = 'Home/GetIndex';
  public urlCreateTask = 'Task/CreateTask';

  private apiUrl = 'https://localhost:7047/api/';

  constructor(private http: HttpClient) { }

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

    return this.http.get<T>(this.apiUrl + url, { params: httpParams });
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