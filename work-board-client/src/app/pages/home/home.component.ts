import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { TaskDialog, TaskModel } from '../../core/model/model';
import { ProgramMode, TaskType, TaskPriority, JobStatus } from '../../core/enum/enums';

import { TaskComponent } from '../task/task.component';
import { TaskProgressComponent } from '../task-progress/task-progress.component';
import { MessageService } from 'src/app/shared/service/message.service';
import { DialogMessageService } from 'src/app/shared/service/dialog-message.service';
import { HomeService } from './home.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public readonly Status = JobStatus
  public readonly TaskType = TaskType;
  public readonly TaskPriority = TaskPriority;

  public dataColWaiting: TaskModel[];
  public dataColProgress: TaskModel[];
  public dataColPending: TaskModel[];
  public dataColCompleted: TaskModel[];

  private readonly sizeDialog = '300px';

  private dataDialog!: TaskModel;

  /**
   * A constructor initializes a class's objects upon creation.
   * @param dialog 
   * @param formBuilder 
   */
  constructor(
    private dialog: Dialog,
    private homeService: HomeService,
    private messageService: MessageService,
    private confirmDialogService: DialogMessageService,
    private readonly utilsService: UtilsService) {

    this.dataColWaiting = [];
    this.dataColProgress = [];
    this.dataColPending = [];
    this.dataColCompleted = [];
  }

  public ngOnInit(): void {
    this.homeService.getInit().subscribe(data => {
      if (data) {
        this.dataDialog = data.taskDialog;

        const dataTask = this.utilsService.getListTask(data.taskDialog.dataTaskStatus ?? [], data.listTasks);

        this.dataColWaiting = dataTask.Waiting;
        this.dataColProgress = dataTask.InProgress;
        this.dataColPending = dataTask.Pending;
        this.dataColCompleted = dataTask.Completed;

        console.log(this.dataColWaiting)
      }
      console.log(data)
    })
  }

  /**
   * Open and process creating a new task.
   */
  addTaskDialog() {
    // Open diag task
    this.dialog.open(TaskComponent, {
      disableClose: true,
      minWidth: this.sizeDialog,
      data: {
        mode: ProgramMode.CREATE,
        data: this.dataDialog
      } as TaskDialog,
    }).closed.subscribe((dialogResult: any) => {
      if (dialogResult) {
        this.homeService.createTask(dialogResult.data).subscribe(result => {
          if (result) {
            this.dataColWaiting = [dialogResult.data, ...this.dataColWaiting];
          } else {
            this.confirmDialogService.openDialog(this.messageService.getMessage('E003'));
          }
        });
      }
    });
  }

  /**
   * Edit the task with the value of the module ID.
   * @param moduleID 
   */
  editTaskDialog(mode: JobStatus, moduleID: string) {
    const data = this.dataColWaiting.find(obj => obj.moduleID === moduleID);

    // Open diag task
    this.dialog.open(TaskComponent, {
      disableClose: true,
      minWidth: this.sizeDialog,
      data: {
        mode: ProgramMode.EDIT,
        data: {
          ...data,
          dataAssignee: this.dataDialog.dataAssignee,
          dataPriority: this.dataDialog.dataPriority,
          dataTaskType: this.dataDialog.dataTaskType
        }
      } as TaskDialog,
    }).closed.subscribe((result: any) => {
      if (result) {
        if (result.isDelete) {
          this.dataColWaiting = this.dataColWaiting.filter(obj => obj.moduleID !== moduleID);
        } else {
          // Handle edit and update task 
          this.handleEditTask(mode, moduleID, data, result.data)
        }
      }
    });
  }

  /**
   * Delete the task based on the module ID.
   * @param mode 
   * @param moduleID 
   */
  public deleteTask(mode: JobStatus, moduleID: string): void {
    this.confirmDialogService.openDialog(this.messageService.getMessage('C001'), true).subscribe(result => {
      if (!result) return;

      if (mode === JobStatus.WAITING) {
        this.dataColWaiting = this.dataColWaiting.filter(obj => obj.moduleID !== moduleID);
      } else if (mode === JobStatus.PROGRESS) {
        this.dataColProgress = this.dataColProgress.filter(obj => obj.moduleID !== moduleID);
      } else if (mode === JobStatus.PENDING) {
        this.dataColPending = this.dataColPending.filter(obj => obj.moduleID !== moduleID);
      }
    });
  }

  /**
   * Edit task progress with the value of the module ID.
   * @param moduleID 
   */
  public editTaskProgressDialog(moduleID: string): void {
    let data = this.dataColProgress.find(obj => obj.moduleID === moduleID);

    this.dialog.open(TaskProgressComponent, {
      disableClose: true,
      minWidth: this.sizeDialog,
      data: { data } as TaskDialog,
    }).closed.subscribe((result: any) => {
      if (result) {
        this.dataColProgress = this.dataColProgress.map(obj => obj.moduleID === moduleID ? { ...obj, ...result.data } : obj);
      }
    });
  }

  /**
   * Calculate and create progress based on the input value.
   * @param progress 
   * @returns 
   */
  public getProgress(progress: number): string {
    progress = progress > 50 ? progress - 50 : progress;
    return Math.round(progress * 3.6) + 'deg'
  }

  /**
   * Drag-and-drop event between columns.
   * @param event 
   */
  public drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  private handleEditTask(mode: JobStatus, moduleID: string, task?: TaskModel, taskEdit?: TaskModel) {
    if (this.utilsService.objCompare(task, taskEdit)) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A002'));
      return;
    }

    this.homeService.updateTask(taskEdit).subscribe(result => {
      if (result) {

      }
    })

    if (mode === JobStatus.WAITING) {
      this.dataColWaiting = this.dataColWaiting.map(obj => obj.moduleID === moduleID ? { ...obj, ...taskEdit } : obj);
    } else if (mode === JobStatus.PROGRESS) {
      this.dataColWaiting = this.dataColWaiting.map(obj => obj.moduleID === moduleID ? { ...obj, ...taskEdit } : obj);
    } else if (mode === JobStatus.PENDING) {
      this.dataColWaiting = this.dataColWaiting.map(obj => obj.moduleID === moduleID ? { ...obj, ...taskEdit } : obj);
    } else {
      this.dataColCompleted = this.dataColCompleted.map(obj => obj.moduleID === moduleID ? { ...obj, ...taskEdit } : obj);
    }
  }

  // private subscriptionFunction() {
  //   this.filterForm.controls['assignee'].valueChanges.subscribe(valueFilter => {
  //     this.newTask = this.initTask.filter(element => {
  //       if (Array.isArray(valueFilter) && (valueFilter.includes(element.assignee)))
  //         return true;
  //       return false;
  //     });

  //     this.inProgress = this.initInProgress.filter(element => {
  //       if (Array.isArray(valueFilter) && (valueFilter.includes(element.assignee)))
  //         return true;
  //       return false;
  //     });
  //   })
  // }

  // toggleAllSelection(event: any) {
  //   if (event._selected) {
  //     this.filterForm.controls['assignee'].patchValue([...this.allAssignees.map(element => element.value)])
  //     event._selected = true;
  //   } else {
  //     this.filterForm.controls['assignee'].setValue([]);
  //   }
  // }

  // applyFilter() {
  //   let valueFilter = this.filterForm.controls['assignee'].value ?? [];
  //   this.newTask = this.initTask.filter(element => {
  //     if (Array.isArray(valueFilter) && (valueFilter.includes(element.assignee)))
  //       return true;
  //     return false;
  //   });

  //   this.inProgress = this.initInProgress.filter(element => {
  //     if (Array.isArray(valueFilter) && (valueFilter.includes(element.assignee)))
  //       return true;
  //     return false;
  //   });
  // }




}
