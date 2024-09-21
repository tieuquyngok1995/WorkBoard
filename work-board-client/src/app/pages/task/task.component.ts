import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { TaskService } from './task.service';
import { MessageService } from '../../shared/service/message.service';
import { DialogMessageService } from '../../shared/service/dialog-message.service';
import { DataListOption, TaskDialog, TaskModel } from '../../core/model/model';
import { ProgramMode } from 'src/app/core/enum/enums';
import { UtilsService } from 'src/app/core/services/utils.service';

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

  private taskType!: number;
  private priority!: number;

  /**
   * Initialize and set base values.
   * @param dialog 
   * @param dialogRef 
   * @param taskService 
   */
  constructor(
    @Inject(DIALOG_DATA)
    private dialog: TaskDialog,
    private dialogRef: DialogRef<TaskDialog>,
    private taskService: TaskService,
    private utilsService: UtilsService,
    private messageService: MessageService,
    private confirmDialogService: DialogMessageService) {
    this.title = 'Create Task';
    this.taskForm = taskService.taskForm;
  }

  //#region Input validation check and processing
  get moduleIDControl() {
    return this.taskService.moduleID;
  }
  get taskTypeControl() {
    return this.taskService.taskType;
  }
  get numRedmineControl() {
    return this.taskService.numRedmine;
  }
  get assigneeControl() {
    return this.taskService.assignee;
  }
  get priorityControl() {
    return this.taskService.priority;
  }
  get dateCreateControl() {
    return this.taskService.dateCreate;
  }
  get estimatedHourControl() {
    return this.taskService.estimatedHour;
  }
  get dateDeliveryControl() {
    return this.taskService.dateDelivery;
  }
  //#endregion

  /**
   * On init dialog
   */
  public ngOnInit(): void {
    // Reset form 
    this.taskService.resetForm();

    if (this.dialog.data) {
      this.dataListAssigne = this.dialog.data.listAssignee ?? [];
      this.dataListPriority = this.dialog.data.listPriority ?? [];
      this.dataListType = this.dialog.data.listTaskType ?? [];

      if (this.dialog.mode === ProgramMode.EDIT) {
        this.title = 'Edit Task';
        this.isEdit = true;

        this.taskService.updateForm(this.dialog.data)
        this.taskTypeControl?.setValue(this.utilsService.getValueDataList(this.dialog.data.taskType ?? 0, this.dataListType));
        this.priorityControl?.setValue(this.utilsService.getValueDataList(this.dialog.data.priority ?? 0, this.dataListPriority));
      }
    }
  }

  /**
   * Filter date, allows to select days from Monday to Friday
   * @param d date input
   * @returns boolean filter date
   */
  public dateFilter(d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  /**
   * Event click Save data
   */
  public save(): void {
    if (!this.taskForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));
      return;
    }

    const dataForm: TaskModel = this.taskForm.value;
    dataForm.taskType = this.utilsService.getKeyDataList(this.taskTypeControl?.value, this.dataListType);
    dataForm.priority = this.utilsService.getKeyDataList(this.priorityControl?.value, this.dataListPriority);
    dataForm.workHour = 0;
    dataForm.progress = 0;

    this.dialogRef.close({ data: dataForm });
  }

  /**
   * Event click Delete data
   */
  public delete(): void {
    this.dialogRef.close({ isDelete: true });
  }

  /**
   * Event click Cancel dialog 
   */
  public cancel(): void {
    this.dialogRef.close();
  }
}