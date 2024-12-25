import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GLOBAL } from '../constants/global';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  public urlSignIn = 'Login/SignIn';
  public urlSignUp = 'Login/SignUp';

  public urlGetIndex = 'Home/GetIndex';

  public urlGetCalendar = 'Calendar/GetAllTask';

  public urlCreateTask = 'Task/CreateTask';
  public urlUpdateTask = 'Task/UpdateTask';
  public urlUpdateTaskStatus = 'Task/UpdateTaskStatus';
  public urlUpdateTaskProgress = 'Task/UpdateTaskProgress';
  public urlDeleteTask = 'Task/DeleteTask';

  public urlSettingGetTemplate = 'Setting/GetTemplateSendMail';
  public urlSettingUpdateTemplate = 'Setting/UpdateTemplateSendMail';
  public urlSettingSendMail = 'Setting/SendMail';
  public urlSettingUsers = 'Setting/GetUser';
  public urlSettingListUsers = 'Setting/GetListUser';
  public urlSettingUpdateUsers = 'Setting/UpdateUser';
  public urlSettingDeleteUsers = 'Setting/DeleteUser';
  public urlSettingTemplateWBS = 'Setting/GetSettingTemplateWBS';
  public urlSettingUpdateTemplateWBS = 'Setting/UpdateSettingTemplateWBS';

  public wsTask = 'wsTask';
  public wsConnect = 'wsConnect';
  public urlConnectWebSocket = 'Home/ConnectWebSocket';

  /**
   * A constructor initializes a class's objects upon creation.
   * @param apiUrl 
   * @param http 
   * @param cookieService 
   */
  constructor(
    @Inject('API_URL')
    private readonly apiUrl: string,
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
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + authToken);
      return this.http.get<T>(this.apiUrl + url, { headers, params: httpParams });
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
    const authToken = this.cookieService.get(GLOBAL.AUTH_TOKEN);
    if (authToken) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + authToken);
      return this.http.post<T>(this.apiUrl + url + '/', body, { headers });
    }
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