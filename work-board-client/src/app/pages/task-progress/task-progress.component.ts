import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { TaskDialog, TaskModel } from '../../core/model/model';
import { fadeAnimation } from "../../shared/animations/animations";
import { MessageService } from '../../shared/service/message.service';
import { DialogMessageService } from '../../shared/service/dialog-message.service';

import { TaskProgressService } from './task-progress.service';

@Component({
  templateUrl: './task-progress.component.html',
  styleUrls: ['./task-progress.component.css'],
  animations: [fadeAnimation]
})
export class TaskProgressComponent implements OnInit {

  public isClose!: boolean;
  public progress: number = 0;
  public taskProgressForm: FormGroup;

  /**
   * A constructor initializes a class's objects upon creation.
   */
  constructor(
    @Inject(DIALOG_DATA)
    private readonly dialog: TaskDialog,
    private readonly messageService: MessageService,
    private readonly dialogRef: DialogRef<TaskDialog>,
    private readonly taskProgressService: TaskProgressService,
    private readonly confirmDialogService: DialogMessageService) {

    this.taskProgressForm = taskProgressService.taskProgressForm;
  }

  get progressControl() {
    return this.taskProgressService.progress;
  }

  /**
   * On init dialog.
   */
  public ngOnInit(): void {
    // Reset form 
    this.taskProgressService.resetForm();

    // Event change progress
    this.progressControl?.valueChanges.subscribe(val => {
      this.progress = val >= 0 && val <= 100 ? val : 0;
    });

    if (this.dialog.data) {
      this.taskProgressForm.patchValue({
        workHour: this.dialog.data.workHour === 0 ? null : Math.round(this.dialog.data.workHour * 100) / 100,
        progress: this.dialog.data.progress === 0 ? null : this.dialog.data.progress,
        dateWorkStart: this.dialog.data.dateWorkStart,
        note: this.dialog.data.note
      });
    }
  }

  /**
   * Event click Save data.
   */
  public save(): void {
    if (!this.taskProgressForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));
      return;
    }

    const dataForm: TaskModel = this.taskProgressForm.value;
    dataForm.workHour = parseFloat(dataForm.workHour.toString());

    if (dataForm.dateWorkStart) {
      const dateWithTime = new Date(dataForm.dateWorkStart);
      dateWithTime.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
      dataForm.dateWorkStart = dateWithTime;
    }

    this.dialogRef.close({ data: dataForm });
  }

  /**
   * Event click Cancel dialog.
   */
  public cancel(): void {
    this.isClose = true;

    setTimeout(() => { this.dialogRef.close(); }, 300);
  }
}