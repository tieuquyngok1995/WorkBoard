import { Dialog, DialogRef } from "@angular/cdk/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

import { DialogConfig } from "../../../config/dialog-config.model";
import { fadeAnimation } from "../../../shared/animations/animations";
import { MessageService } from "../../../shared/service/message.service";
import { DataListOption, UserDialog, UserModel } from "../../../core/model/model";
import { DialogMessageService } from "../../../shared/service/dialog-message.service";

import { UserService } from "./user.service";
import { UserDialogComponent } from "../user-dialog/user-dialog.component";

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeAnimation],
})
export class UserComponent implements OnInit {
  // Check close dialog 
  public isClose!: boolean;
  // Data table
  public dataSource: MatTableDataSource<UserModel>;

  private dataRole: DataListOption[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * A constructor initializes a class's objects upon creation.
   */
  constructor(
    private readonly dialogRef: DialogRef<any>,
    private readonly dialog: Dialog,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly confirmDialogService: DialogMessageService) {

    this.dataRole = [];
    this.dataSource = new MatTableDataSource<UserModel>([]);
  }

  /**
   * Handle data init
   */
  public ngOnInit(): void {
    this.userService.getInit().subscribe(data => {
      if (data) {
        this.dataRole = data.dataRole ?? [];
        this.dataSource.data = data.users;
      }
    })
  }

  /**
   * Handle data after view init
   */
  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public editUser(rowIndex: number): void {
    console.log(rowIndex)

    this.dialog.open(UserDialogComponent, {
      disableClose: true,
      minWidth: DialogConfig.DEFAULT_WIDTH,
      data: {
        data: this.dataSource.data[rowIndex],
        dataRole: this.dataRole,
        dataName: this.dataSource.data.filter((_, index) => index !== rowIndex).map(user => user.userName)
      } as UserDialog
    }).closed.subscribe((dialogResult: any) => {
      if (dialogResult) {
        this.userService.updateUser(dialogResult.data).subscribe(data => {
          if (!data) {
            this.confirmDialogService.openDialog(this.messageService.getMessage('E017'));
          } else {
            const currentData = this.dataSource.data;
            currentData[rowIndex] = dialogResult.data;
            this.dataSource.data = [...currentData];
          }
        });
      }
    });
  }

  /**
   * Delete user with id 
   * @param rowIndex 
   */
  public deleteUser(rowIndex: number): void {
    this.confirmDialogService.openDialog(this.messageService.getMessage('C002'), true).subscribe(result => {
      if (!result) return;

      const data = this.dataSource.data[rowIndex];
      this.userService.deleteUser(data.userID).subscribe(result => {
        if (!result) {
          this.confirmDialogService.openDialog(this.messageService.getMessage('E018'));
        } else {
          const currentData = this.dataSource.data;
          currentData.splice(rowIndex, 1);
          this.dataSource.data = [...currentData];
        }
      })
    });
  }

  /**
   * Close dialog
   */
  public close() {
    this.isClose = true;
    // Delay close 300ms
    setTimeout(() => { this.dialogRef.close(); }, 300);
  }
}