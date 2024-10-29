import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataListOption, UserDialog, UserModel } from 'src/app/core/model/model';
import { fadeAnimation } from 'src/app/shared/animations/animations';
import { UserService } from './user-dialog.service';
import { MessageService } from 'src/app/shared/service/message.service';
import { DialogMessageService } from 'src/app/shared/service/dialog-message.service';

@Component({
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
  animations: [fadeAnimation]
})
export class UserDialogComponent {
  // Check close dialog
  public isClose!: boolean;
  // User form
  public userForm!: FormGroup;
  // Data list role
  public dataRole!: DataListOption[];

  /**
   * A constructor initializes a class's objects upon creation.
   * @param dialog 
   * @param taskService 
   * @param messageService 
   * @param dialogRef 
   * @param confirmDialogService 
   */
  constructor(
    @Inject(DIALOG_DATA)
    private readonly dialog: UserDialog,
    private readonly userService: UserService,
    private readonly dialogRef: DialogRef<any>,
    private readonly messageService: MessageService,
    private readonly confirmDialogService: DialogMessageService) {
    this.userForm = userService.userForm;
  }

  get password() {
    return this.userService.password;
  }

  /**
   * On init dialog.
   */
  public ngOnInit(): void {
    // Reset form 
    this.userService.resetForm();

    if (this.dialog.data) {
      this.dataRole = this.dialog.dataRole ?? [];
      // Update form
      this.userService.updateForm(this.dialog.data)
    }
  }

  /**
   * Reset passord default
   */
  public resetPassword(): void {
    this.password?.setValue("Abc12345");
  }

  public save(): void {
    if (!this.userForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));
      return;
    }

    const dataForm: UserModel = this.userForm.value;
    const checkUserName = this.dialog.dataName.includes(dataForm.userName);
    if (checkUserName || dataForm.userName.toUpperCase() === "ADMIN") {
      this.confirmDialogService.openDialog(this.messageService.getMessage('E016'));
      return;
    }

    dataForm.roleName = this.dataRole.find(obj => obj.key == dataForm.roleID)?.value ?? '';
    this.dialogRef.close({ data: dataForm });
  }

  public cancel(): void {
    this.isClose = true;
    // Delay close 300ms
    setTimeout(() => {
      this.dialogRef.close();
    }, 300);
  }
}
