import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  private apiUrl = 'https://localhost:7047/';

  constructor(private http: HttpClient) { }

  // Method to make GET request
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.apiUrl + url).pipe(
      catchError(this.handleError)
    );
  }

  // Method to make POST request
  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + url + '/', body).pipe(
      catchError(this.handleError)
    );
  }

  // Method to make PUT request
  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.apiUrl + url + '/', body).pipe(
      catchError(this.handleError)
    );
  }

  // Method to make DELETE request
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.apiUrl + url + '/').pipe(
      catchError(this.handleError)
    );
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request. Please check the input data.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please login and try again.';
          break;
        case 403:
          errorMessage = 'Forbidden. You do not have permission to access this resource.';
          break;
        case 404:
          errorMessage = 'Not Found. The requested resource could not be found.';
          break;
        case 500:
          errorMessage = 'Internal Server Error. Please try again later.';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    // Return a user-friendly error message
    return throwError(errorMessage);
  }
}