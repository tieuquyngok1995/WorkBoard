import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, delay, finalize, mergeMap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, } from '@angular/common/http';

import { LoadingService } from '../services/loading.service';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../../shared/service/message.service';
import { DialogMessageService } from '../../shared/service/dialog-message.service';

@Injectable()
export class HandleApiInterceptor implements HttpInterceptor {

  /**
   *  A constructor initializes a class's objects upon creation.
   * @param router 
   * @param authService 
   * @param loadingService 
   * @param messageService 
   * @param confirmDialogService 
   */
  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private confirmDialogService: DialogMessageService) { }

  /**
   * 
   * @param request 
   * @param next 
   * @returns 
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    const minTime$ = of(null).pipe(delay(500));

    return minTime$.pipe(
      mergeMap(() =>
        next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 400 || error.status === 500) {
              this.confirmDialogService.openDialog(this.messageService.getMessage('E009') + error.message);
              return EMPTY;
            } else if (error.status === 401) {
              this.authService.logOut();
              return throwError(() => error.ok);
            } else if (error.status === 406) {
              this.confirmDialogService.openDialog(this.messageService.getMessage('E014'));
              return EMPTY;
            } else if (error.status === 404) {
              this.router.navigate(['/404']);
              return EMPTY;
            }

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