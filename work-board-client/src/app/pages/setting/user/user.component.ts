
import { Component, OnInit, ViewChild } from "@angular/core";
import { DialogRef } from "@angular/cdk/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { UserModel } from "../../../core/model/model";
import { fadeAnimation } from "../../../shared/animations/animations";

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeAnimation],
})
export class SettingUserComponent implements OnInit {
  /** Check close dialog */
  public isClose!: boolean;

  dataSource = new MatTableDataSource<UserModel>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * A constructor initializes a class's objects upon creation.
   * @param dialog 
   * @param taskService 
   * @param messageService 
   * @param dialogRef 
   * @param confirmDialogService 
   */
  constructor(
    private dialogRef: DialogRef<any>,) {

  }

  ngOnInit(): void {

  }

  public editUser(rowIndex: number): void {
    console.log(rowIndex)
  }
  public deleteUser(rowIndex: number): void {

  }

  public close() {
    this.isClose = true;


    setTimeout(() => {
      this.dialogRef.close();
    }, 300);
  }
}

const ELEMENT_DATA: UserModel[] = Array.from({ length: 30 }, (_, index) => ({
  userID: index + 1,
  email: `user${index + 1}@example.com`,
  userName: `User ${index + 1}`,
  password: '1',
  roleID: 1,
  roleName: index % 2 === 0 ? "Admin" : "User",
  dataRole: null
}) as UserModel);