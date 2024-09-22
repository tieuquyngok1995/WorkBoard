import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, finalize, mergeMap } from 'rxjs/operators';

import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();

    const minTime$ = of(null).pipe(delay(500));

    return minTime$.pipe(
      mergeMap(() =>
        next.handle(request).pipe(
          finalize(() => {
            this.loadingService.hide();
          })
        )
      )
    );
  }
}