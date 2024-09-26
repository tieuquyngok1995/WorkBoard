import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { ProgramMode } from '../../core/enum/enums';
import { DataListOption, TaskDialog, TaskModel } from '../../core/model/model';
import { MessageService } from '../../shared/service/message.service';
import { DialogMessageService } from '../../shared/service/dialog-message.service';
import { TaskService } from './task.service';
import { GLOBAL } from 'src/app/core/constants/global';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public title: string;
  public isEdit!: boolean;
  public taskForm!: FormGroup;

  public dataListType!: DataListOption[];
  public dataListPriority!: DataListOption[];
  public dataListAssigne!: DataListOption[];

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
    private dialog: TaskDialog,
    private taskService: TaskService,
    private messageService: MessageService,
    private dialogRef: DialogRef<TaskDialog>,
    private confirmDialogService: DialogMessageService) {
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

      if (this.dialog.mode === ProgramMode.EDIT) {
        this.title = GLOBAL.EDIT_TASK;
        this.isEdit = true;

        this.taskService.updateForm(this.dialog.data)
      }
    }
  }

  /**
   * Filter date, allows to select days from Monday to Friday.
   * @param d date input
   * @returns boolean filter date
   */
  public dateFilter(d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  /**
   * Event click Save data.
   */
  public save(): void {
    if (!this.taskForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));
      return;
    }

    const dataForm: TaskModel = this.taskForm.value;
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
    this.dialogRef.close();
  }
}