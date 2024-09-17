import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DialogData } from '../home/home.component';
import { TaskModel } from '../home/home.model';
import { FormGroup } from '@angular/forms';
import { TaskProgressService } from './task-progress.service';

@Component({
  selector: 'app-task-progress',
  templateUrl: './task-progress.component.html',
  styleUrls: ['./task-progress.component.css']
})
export class TaskProgressComponent implements OnInit {

  public taskProgressForm: FormGroup;

  progress: number = 0;

  /**
   * Initialize and set base values
   * @param data 
   * @param dialogRef 
   * @param taskService 
   */
  constructor(
    @Inject(DIALOG_DATA) public data: DialogData,
    public dialogRef: DialogRef<{ isDelete: boolean, data: TaskModel, index?: number }>,
    private taskProgressService: TaskProgressService) {

    this.taskProgressForm = this.taskProgressService.taskProgressForm;
  }

  //#region Input validation check and processing
  get workHourControl() {
    return this.taskProgressService.workHourControl;
  }
  get progressControl() {
    return this.taskProgressService.progressControl;
  }
  //#endregion

  /**
   * On init dialog
   */
  ngOnInit() {
    // Event change progress
    this.progressControl?.valueChanges.subscribe(val => {
      this.progress = val >= 0 && val <= 100 ? val : 0;
    });
  }

  /**
   * Event click Save data
   */
  save() {

    this.dialogRef.close();
  }

  /**
   * Event click Cancel dialog 
   */
  cancel() {
    this.dialogRef.close();
  }
}
