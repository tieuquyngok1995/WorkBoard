import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialog-message/dialog-message.component';

@Injectable({
  providedIn: 'root'
})
export class DialogMessageService {

  constructor(private dialog: MatDialog) { }

  openDialog(message: string, isConfirm?: boolean): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: '450px',
      data: { message, isConfirm }
    });

    return dialogRef.afterClosed();
  }
}