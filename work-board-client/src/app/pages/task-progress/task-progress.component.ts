import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { TaskDialog } from '../../core/model/model';
import { MessageService } from '../../shared/service/message.service';
import { DialogMessageService } from '../../shared/service/dialog-message.service';

import { TaskProgressService } from './task-progress.service';

@Component({
  selector: 'app-task-progress',
  templateUrl: './task-progress.component.html',
  styleUrls: ['./task-progress.component.css']
})
export class TaskProgressComponent implements OnInit {

  public progress: number = 0;
  public taskProgressForm: FormGroup;

  /**
   * Initialize and set base values.
   * @param data 
   * @param dialogRef 
   * @param taskService 
   */
  constructor(
    @Inject(DIALOG_DATA)
    private dialog: TaskDialog,
    private dialogRef: DialogRef<TaskDialog>,
    private messageService: MessageService,
    private taskProgressService: TaskProgressService,
    private confirmDialogService: DialogMessageService) {
    this.taskProgressForm = taskProgressService.taskProgressForm;
  }

  //#region Input validation check and processing
  get workHourControl() {
    return this.taskProgressService.workHour;
  }
  get progressControl() {
    return this.taskProgressService.progress;
  }
  get noteControl() {
    return this.taskProgressService.note;
  }
  //#endregion

  /**
   * On init dialog
   */
  ngOnInit() {
    // Reset form 
    this.taskProgressService.resetForm();

    // Event change progress
    this.progressControl?.valueChanges.subscribe(val => {
      this.progress = val >= 0 && val <= 100 ? val : 0;
    });

    if (this.dialog.data) {
      this.workHourControl?.setValue(this.dialog.data.workHour === 0 ? null : this.dialog.data.workHour);
      this.progressControl?.setValue(this.dialog.data.progress === 0 ? null : this.dialog.data.progress);
      this.noteControl?.setValue(this.dialog.data.note);
    }
  }

  /**
   * Event click Save data
   */
  save() {
    if (!this.taskProgressForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));
      return;
    }

    const data = { ... this.dialog.data, ...  this.taskProgressForm.value }
    this.dialogRef.close({ data: data });
  }

  /**
   * Event click Cancel dialog 
   */
  cancel() {
    this.dialogRef.close();
  }
}
