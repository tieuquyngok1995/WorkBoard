import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { TaskModel } from './task.model';
import { TaskService } from './task.service';
import { DialogData } from '../home/home.component';
import { DataListOption } from 'src/app/shared/models/dataList.model';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public taskForm: FormGroup;

  public dataListType!: DataListOption[];

  public dataListAssigne!: DataListOption[];

  constructor(
    @Inject(DIALOG_DATA) public data: DialogData,
    public dialogRef: DialogRef<TaskComponent>,
    private taskService: TaskService) {
    this.dataListType = [
      { key: '1', value: 'Coding' },
      { key: '2', value: 'Review' },
      { key: '3', value: 'Testing' },
      { key: '4', value: 'Fixbug' }
    ]
    this.dataListAssigne = [
      { key: '1', value: 'Tuan-VQ' },
      { key: '2', value: 'Thinh-NT' },
      { key: '3', value: 'Duy-PNA' },
      { key: '4', value: 'Hieu-MTH' }
    ]
    this.taskForm = this.taskService.taskForm;
  }

  ngOnInit() {

  }


  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  submit() {
    const taskForm: TaskModel = this.taskForm.value;
    console.log(taskForm);
    this.dialogRef.close();
  }

  get moduleIDControl() {
    return this.taskService.moduleIDControl;
  }

  get taskTypeControl() {
    return this.taskService.taskTypeControl;
  }

  get numRedmineControl() {
    return this.taskService.numRedmineControl;
  }

  get assigneeControl() {
    return this.taskService.assigneeControl;
  }

  get dateCreateControl() {
    return this.taskService.dateCreateControl;
  }

  get estimatedHourControl() {
    return this.taskService.estimatedHourControl;
  }

  get dateDeliveryControl() {
    return this.taskService.dateDeliveryControl;
  }
}
