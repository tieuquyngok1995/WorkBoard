
import { Component, OnInit, ViewChild } from "@angular/core";
import { Dialog, DialogRef } from "@angular/cdk/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { DataListOption, UserDialog, UserModel } from "../../../core/model/model";
import { fadeAnimation } from "../../../shared/animations/animations";
import { UserService } from "./user.service";
import { UserDialogComponent } from "../user-dialog/user-dialog.component";
import { MessageService } from "src/app/shared/service/message.service";
import { DialogMessageService } from "src/app/shared/service/dialog-message.service";

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeAnimation],
})
export class SettingUserComponent implements OnInit {
  // Check close dialog 
  public isClose!: boolean;
  // Data table
  public dataSource: MatTableDataSource<UserModel>;

  private dataRole: DataListOption[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * A constructor initializes a class's objects upon creation.
   * @param dialog 
   * @param taskService 
   * @param messageService 
   * @param dialogRef 
   * @param confirmDialogService 
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

  public ngOnInit(): void {
    this.userService.getInit().subscribe(data => {
      if (data) {
        this.dataRole = data.dataRole ?? [];
        this.dataSource.data = data.users;
      }
    })

  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public editUser(rowIndex: number): void {
    console.log(rowIndex)

    this.dialog.open(UserDialogComponent, {
      disableClose: true,
      minWidth: '300px',
      data: {
        data: this.dataSource.data[rowIndex],
        dataRole: this.dataRole,
        dataName: this.dataSource.data.filter((_, index) => index !== rowIndex).map(user => user.userName)
      } as UserDialog
    }).closed.subscribe((dialogResult: any) => {
      if (dialogResult) {
        this.userService.updateUser(dialogResult.data).subscribe(data => {
          if (!data) {
            this.confirmDialogService.openDialog(this.messageService.getMessage('E003'));
          } else {
            const currentData = this.dataSource.data;
            currentData[rowIndex] = dialogResult.data;
            this.dataSource.data = [...currentData];
          }
        });
      }
    });
  }

  public deleteUser(rowIndex: number): void {

  }

  public close() {
    this.isClose = true;
    // Delay close 300ms
    setTimeout(() => {
      this.dialogRef.close();
    }, 300);
  }
}