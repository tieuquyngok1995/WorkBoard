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
   * @param dialog 
   * @param messageService 
   * @param dialogRef 
   * @param taskProgressService 
   * @param confirmDialogService 
   */
  constructor(
    @Inject(DIALOG_DATA)
    private dialog: TaskDialog,
    private messageService: MessageService,
    private dialogRef: DialogRef<TaskDialog>,
    private taskProgressService: TaskProgressService,
    private confirmDialogService: DialogMessageService) {
    this.taskProgressForm = taskProgressService.taskProgressForm;
  }

  get progressControl() {
    return this.taskProgressService.progress;
  }

  /**
   * On init dialog.
   */
  ngOnInit() {
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
  save() {
    if (!this.taskProgressForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));
      return;
    }

    const dataForm: TaskModel = this.taskProgressForm.value;
    dataForm.workHour = parseFloat(dataForm.workHour.toString());
    this.dialogRef.close({ data: dataForm });
  }

  /**
   * Event click Cancel dialog.
   */
  cancel() {
    this.dialogRef.close();
  }
}