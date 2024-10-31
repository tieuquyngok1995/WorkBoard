import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { ProgramMode } from '../../core/enum/enums';
import { GLOBAL } from '../../core/constants/global';
import { fadeAnimation } from "../../shared/animations/animations";
import { MessageService } from '../../shared/service/message.service';
import { DataListOption, TaskDialog, TaskModel } from '../../core/model/model';
import { DialogMessageService } from '../../shared/service/dialog-message.service';

import { TaskService } from './task.service';

@Component({
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  animations: [fadeAnimation]
})
export class TaskComponent implements OnInit {
  public title: string;
  public isRead!: boolean;
  public isClose!: boolean;
  public isReadModuleID!: boolean;
  public taskForm!: FormGroup;

  public dataListType!: DataListOption[];
  public dataListPriority!: DataListOption[];
  public dataListAssigne!: DataListOption[];

  /**
   * A constructor initializes a class's objects upon creation.
   */
  constructor(
    @Inject(DIALOG_DATA)
    private readonly dialog: TaskDialog,
    private readonly taskService: TaskService,
    private readonly messageService: MessageService,
    private readonly dialogRef: DialogRef<TaskDialog>,
    private readonly confirmDialogService: DialogMessageService) {

    this.title = GLOBAL.CREATE_TASK;
    this.taskForm = taskService.taskForm;
  }

  /**
   * On init dialog.
   */
  public ngOnInit(): void {
    // Reset form 
    this.taskService.resetForm();

    if (this.dialog.data) {
      this.dataListAssigne = this.dialog.data.dataAssignee ?? [];
      this.dataListPriority = this.dialog.data.dataPriority ?? [];
      this.dataListType = this.dialog.data.dataTaskType ?? [];

      if (this.dialog.mode === ProgramMode.CLONE) {
        this.title = GLOBAL.DUPLICATION_TASK;
      }
      else if (this.dialog.mode === ProgramMode.EDIT) {
        this.title = GLOBAL.EDIT_TASK;
        this.isReadModuleID = true;

      } else if (this.dialog.mode === ProgramMode.READ) {
        this.title = GLOBAL.READ_TASK;
        this.isRead = true;
        this.isReadModuleID = true;
      }

      this.taskService.updateForm(this.dialog.data)
    }
  }

  /**
   * Event click Save data.
   */
  public save(): void {
    if (!this.taskForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));
      return;
    }

    const dataForm: TaskModel = this.taskForm.value;
    dataForm.assigneeName = this.dataListAssigne.find(obj => obj.key == dataForm.assignee)?.value ?? '';
    dataForm.workHour = 0
    dataForm.progress = 0;

    this.dialogRef.close({ data: dataForm });
  }

  /**
   * Event click Delete data.
   */
  public delete(): void {
    this.dialogRef.close({ isDelete: true });
  }

  /**
   * Event click Cancel dialog .
   */
  public cancel(): void {
    this.isClose = true;

    setTimeout(() => { this.dialogRef.close(); }, 300);
  }
}