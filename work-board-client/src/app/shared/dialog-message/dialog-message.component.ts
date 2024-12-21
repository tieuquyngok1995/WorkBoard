import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  public title!: string;
  public message!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { message: string, isConfirm: boolean },
    private readonly dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  public ngOnInit(): void {
    this.title = this.data.isConfirm ? 'Confirmation' : 'Warning'
    this.message = this.data.message.replace('.', '.<br>');
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}