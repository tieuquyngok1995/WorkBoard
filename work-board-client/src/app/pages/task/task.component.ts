import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { TaskService } from './task.service';
import { DialogData } from '../home/home.component';
import { MessageService } from '../../shared/service/message.service';
import { DialogMessageService } from '../../shared/service/dialog-message.service';
import { DataListOption, TaskModel } from '../../core/model/model';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public taskForm: FormGroup;

  public dataListType!: DataListOption[];
  public dataListPriority!: DataListOption[];
  public dataListAssigne!: DataListOption[];

  public isDelete!: boolean;

  private taskType!: number;
  private priority!: number;

  /**
   * Initialize and set base values
   * @param data 
   * @param dialogRef 
   * @param taskService 
   */
  constructor(
    @Inject(DIALOG_DATA) public data: DialogData,
    public dialogRef: DialogRef<{ isDelete: boolean, data: TaskModel, index?: number }>,
    private taskService: TaskService,
    private messageService: MessageService,
    private confirmDialogService: DialogMessageService) {

    this.dataListType = [
      { key: 1, value: 'Coding' },
      { key: 2, value: 'Review' },
      { key: 3, value: 'Testing' },
      { key: 4, value: 'Fixbug' }
    ]
    this.dataListPriority = [
      { key: 1, value: 'High' },
      { key: 2, value: 'Medium' },
      { key: 3, value: 'Low' }
    ]
    this.dataListAssigne = [
      { key: 1, value: 'Tuan-VQ' },
      { key: 2, value: 'Thinh-NT' },
      { key: 3, value: 'Duy-PNA' },
      { key: 4, value: 'Hieu-MTH' }
    ]
    this.taskForm = this.taskService.taskForm;
  }

  //#region Input validation check and processing
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
  get priorityControl() {
    return this.taskService.priorityControl;
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
  //#endregion

  /**
   * On init dialog
   */
  ngOnInit() {
    // Event change get value task type
    this.taskTypeControl?.valueChanges.subscribe(val => {
      this.taskType = val;
    });

    // Event change get value task type
    this.priorityControl?.valueChanges.subscribe(val => {
      this.priority = val;
    });

    if (this.data) this.isDelete = true
  }

  /**
   * Filter date, allows to select days from Monday to Friday
   * @param d date input
   * @returns boolean filter date
   */
  public dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  /**
   * Event click Save data
   */
  save() {
    if (!this.taskForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));

      return;
    }

    const dataForm: TaskModel = this.taskForm.value;
    dataForm.taskType = this.taskType;
    dataForm.priority = this.priority;

    this.dialogRef.close({ isDelete: false, data: dataForm });
  }

  /**
   * Event click Delete data
   */
  delete() {
    this.dialogRef.close({ isDelete: true, data: this.taskForm.value });
  }

  /**
   * Event click Cancel dialog 
   */
  cancel() {
    this.dialogRef.close();
  }

}