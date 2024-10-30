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
  public urlConnectWebSocket = 'Home/ConnectWebSocket';

  public urlCreateTask = 'Task/CreateTask';
  public urlUpdateTask = 'Task/UpdateTask';
  public urlUpdateTaskStatus = 'Task/UpdateTaskStatus';
  public urlUpdateTaskProgress = 'Task/UpdateTaskProgress';
  public urlDeleteTask = 'Task/DeleteTask';

  public urlSettingUsers = 'Setting/GetUser';
  public urlSettingUpdateUsers = 'Setting/UpdateUser';
  public urlSettingDeleteUsers = 'Setting/DeleteUser';

  public wsTask = 'wsTask';
  public wsConnect = 'wsConnect';

  /**
   * A constructor initializes a class's objects upon creation.
   * @param apiUrl 
   * @param http 
   * @param cookieService 
   */
  constructor(
    @Inject('API_URL') private readonly apiUrl: string,
    private readonly http: HttpClient,
    private readonly cookieService: CookieService) { }

  /**
   * Method to make GET request.
   * @param url 
   * @param params 
   * @returns 
   */
  public get<T>(url: string, params?: { [key: string]: any }): Observable<T> {
    let httpParams = new HttpParams();

    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }

    const authToken = this.cookieService.get(GLOBAL.AUTH_TOKEN);
    if (authToken) {
      const header = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get(GLOBAL.AUTH_TOKEN));
      return this.http.get<T>(this.apiUrl + url, { headers: header, withCredentials: true, params: httpParams });
    }
    return this.http.get<T>(this.apiUrl + url, { params: httpParams });
  }

  /**
   * Method to make POST request.
   * @param url 
   * @param body 
   * @returns 
   */
  public post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + url + '/', body);
  }

  /**
   * Method to make PUT request.
   * @param url 
   * @param body 
   * @returns 
   */
  public put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.apiUrl + url + '/', body);
  }

  /**
   * Method to make DELETE request.
   * @param url 
   * @param params 
   * @returns 
   */
  public delete<T>(url: string, params?: { [key: string]: any }): Observable<T> {
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