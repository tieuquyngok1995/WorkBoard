import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, finalize, mergeMap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, } from '@angular/common/http';

import { LoadingService } from '../services/loading.service';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'src/app/shared/service/message.service';
import { DialogMessageService } from 'src/app/shared/service/dialog-message.service';

@Injectable()
export class HandleApiInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService, private loadingService: LoadingService,
    private messageService: MessageService,
    private confirmDialogService: DialogMessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();

    const minTime$ = of(null).pipe(delay(1000));

    return minTime$.pipe(
      mergeMap(() =>
        next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 400 || error.status === 500) {
              console.log(error)
              this.confirmDialogService.openDialog(this.messageService.getMessage('E009') + error.message);
              return throwError(() => error.ok);
            }
            else if (error.status === 401) {
              this.authService.logOut();
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