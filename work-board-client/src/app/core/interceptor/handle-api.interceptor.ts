import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, finalize, mergeMap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, } from '@angular/common/http';

import { LoadingService } from '../services/loading.service';

@Injectable()
export class HandleApiInterceptor implements HttpInterceptor {

  constructor(private router: Router, private loadingService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();

    const minTime$ = of(null).pipe(delay(500));

    return minTime$.pipe(
      mergeMap(() =>
        next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 400 || error.status === 500) {
              return throwError(() => error.ok);
            }

            this.router.navigate(['/404']);
            return throwError(() => error.ok);
          }),
          finalize(() => {
            this.loadingService.hide();
          })
        )
      )
    );
  }
}