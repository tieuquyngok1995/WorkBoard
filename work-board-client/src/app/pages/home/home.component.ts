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
import { DataService } from 'src/app/shared/service/data.service';

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
    private readonly dialog: Dialog,
    private readonly homeService: HomeService,
    private readonly messageService: MessageService,
    private readonly confirmDialogService: DialogMessageService,
    private readonly utilsService: UtilsService, private readonly dataService: DataService) {

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
      }
    })
    this.dataService.currentData.subscribe(data => {

      console.log('Data received from header:', data);
    });
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
        this.homeService.createTask(dialogResult.data).subscribe(data => {
          if (data) {
            this.dataColWaiting = [data, ...this.dataColWaiting];
          } else {
            this.confirmDialogService.openDialog(this.messageService.getMessage('E003'));
          }
        });
      }
    });
  }

  /**
   * Edit the task with the value of the module ID.
   * @param mode
   * @param id 
   */
  editTaskDialog(mode: JobStatus, id: number) {
    let data: TaskModel | undefined;
    if (mode === JobStatus.WAITING) {
      data = this.dataColWaiting.find(obj => obj.id === id);
    } else if (mode === JobStatus.PROGRESS) {
      data = this.dataColProgress.find(obj => obj.id === id);
    } else if (mode === JobStatus.PENDING) {
      data = this.dataColPending.find(obj => obj.id === id);
    } else {
      data = this.dataColCompleted.find(obj => obj.id === id);
    }

    if (!data) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('E011'));
      return;
    }

    // Open diag task
    this.dialog.open(TaskComponent, {
      disableClose: true,
      minWidth: this.sizeDialog,
      data: {
        mode: mode === JobStatus.COMPLETED ? ProgramMode.READ : ProgramMode.EDIT,
        data: {
          ...data,
          dataAssignee: this.dataDialog.dataAssignee,
          dataPriority: this.dataDialog.dataPriority,
          dataTaskType: this.dataDialog.dataTaskType
        }
      } as TaskDialog,
    }).closed.subscribe((dialogResult: any) => {
      if (dialogResult) {
        if (dialogResult.isDelete) {
          this.dataColWaiting = this.dataColWaiting.filter(obj => obj.id !== id);
        } else {
          // Handle edit and update task 
          this.handleEditTask(mode, id, data, dialogResult.data)
        }
      }
    });
  }

  /**
   * Handle edit task.
   * @param mode 
   * @param id 
   * @param task 
   * @param taskEdit 
   * @returns 
   */
  private handleEditTask(mode: JobStatus, id: number, task?: TaskModel, taskEdit?: TaskModel) {
    if (this.utilsService.objCompare(task, taskEdit)) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A002'));
      return;
    }

    if (mode === JobStatus.COMPLETED) {
      return;
    }

    this.homeService.updateTask({ ...task, ...taskEdit } as TaskModel).subscribe(result => {
      if (result) {
        if (mode === JobStatus.WAITING) {
          this.dataColWaiting = this.dataColWaiting.map(obj => obj.id === id ? { ...obj, ...taskEdit } : obj);
        } else if (mode === JobStatus.PROGRESS) {
          this.dataColProgress = this.dataColProgress.map(obj => obj.id === id ? { ...obj, ...taskEdit } : obj);
        } else if (mode === JobStatus.PENDING) {
          this.dataColPending = this.dataColPending.map(obj => obj.id === id ? { ...obj, ...taskEdit } : obj);
        }
      } else {
        this.confirmDialogService.openDialog(this.messageService.getMessage('E010'));
      }
    })
  }

  /**
   * Delete the task based on the module ID.
   * @param mode 
   * @param id
   * @param moduleID 
   */
  public deleteTask(mode: JobStatus, id: number, moduleID: string): void {
    this.confirmDialogService.openDialog(this.messageService.getMessage('C001'), true).subscribe(result => {
      if (!result) return;

      this.homeService.delete(id, moduleID).subscribe(result => {
        if (result) {
          if (mode === JobStatus.WAITING) {
            this.dataColWaiting = this.dataColWaiting.filter(obj => obj.moduleID !== moduleID);
          } else if (mode === JobStatus.PROGRESS) {
            this.dataColProgress = this.dataColProgress.filter(obj => obj.moduleID !== moduleID);
          } else if (mode === JobStatus.PENDING) {
            this.dataColPending = this.dataColPending.filter(obj => obj.moduleID !== moduleID);
          }
        } else {
          this.confirmDialogService.openDialog(this.messageService.getMessage('E012'));
        }
      })
    });
  }

  /**
   * Edit task progress with the value of the module ID.
   * @param id 
   * @param moduleID 
   */
  public editTaskProgressDialog(id: number, moduleID: string): void {
    let data = this.dataColProgress.find(obj => obj.id === id);

    this.dialog.open(TaskProgressComponent, {
      disableClose: true,
      minWidth: this.sizeDialog,
      data: { data } as TaskDialog,
    }).closed.subscribe((dialogResult: any) => {
      if (dialogResult) {
        data = dialogResult.data;
        if (data) {
          this.homeService.updateTaskProgress(id, moduleID, data.workHour, data.progress, data.note ?? '').subscribe(result => {
            if (result) {
              this.dataColProgress = this.dataColProgress.map(obj => obj.moduleID === moduleID ? { ...obj, ...dialogResult.data } : obj);
            } else {
              this.confirmDialogService.openDialog(this.messageService.getMessage('E013'));
            }
          });
        }
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
  public onDrop(event: CdkDragDrop<any[]>, mode?: JobStatus) {
    const taskModel = event.item.data as TaskModel;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (mode === JobStatus.COMPLETED) {
      if (taskModel.progress !== 100) {
        this.confirmDialogService.openDialog(this.messageService.getMessage('A004'));
        return;
      } else {
        this.homeService.updateTaskStatus(JobStatus.COMPLETED, taskModel.id, taskModel.moduleID, taskModel.workHour, taskModel.progress, null);
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          0,
        );
      }
    } else {
      const id = event.container.id;
      let taskStatus;
      if (id === 'progress') {
        taskStatus = JobStatus.PROGRESS;

        taskModel.dateStartWork = new Date();
      } else {
        taskStatus = JobStatus.PENDING;

        taskModel.workHour += this.calculateWorkingHours(taskModel.dateStartWork);
        taskModel.progress = this.calculateProgress(taskModel.workHour, taskModel.estimatedHour);
        taskModel.dateStartWork = null;
      }

      const index = event.previousContainer.data.findIndex(obj => obj.id === taskModel.id);
      if (index !== -1) event.previousContainer.data[index] = { ...event.previousContainer.data[index], ...taskModel };

      this.homeService.updateTaskStatus(taskStatus, taskModel.id, taskModel.moduleID, taskModel.workHour, taskModel.progress, taskModel.dateStartWork);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  /**
   * Caculate working hours.
   * @param startDate 
   * @returns 
   */
  private calculateWorkingHours(startDate: Date | null): number {
    if (!startDate) return 0;

    if (typeof startDate === 'string') startDate = new Date(startDate);

    const endDate = new Date();
    const workDayHours = 8,
      morningStart = 8, morningEnd = 12,
      afternoonStart = 13.25, afternoonEnd = 17.25;

    const adjustTime = (date: Date, isStart: boolean) => {
      const hours = date.getHours() + date.getMinutes() / 60;
      if (isStart && hours >= afternoonEnd) date.setHours(morningStart, 0, 0, 0);
      if (!isStart && hours > afternoonEnd) date.setHours(afternoonEnd, 15, 0, 0);
      if (isStart && hours < morningStart) date.setHours(morningStart, 0, 0, 0);
      if (!isStart && hours < morningStart) date.setHours(morningStart, 0, 0, 0);
    };

    const workingHoursInDay = (date: Date) => {
      const hours = date.getHours() + date.getMinutes() / 60;
      if (hours < morningStart || hours >= afternoonEnd) return 0;
      if (hours <= morningEnd) return Math.min(hours - morningStart, morningEnd - morningStart);
      return morningEnd - morningStart + Math.min(hours - afternoonStart, afternoonEnd - afternoonStart);
    };

    adjustTime(startDate, true);
    adjustTime(endDate, false);

    if (startDate.toDateString() === endDate.toDateString()) {
      return Math.ceil((workingHoursInDay(endDate) - workingHoursInDay(startDate)) * 20) / 20;
    }

    const firstDayHours = workDayHours - workingHoursInDay(startDate);
    const lastDayHours = workingHoursInDay(endDate);
    const fullDaysBetween = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) - 1;
    const middleHours = fullDaysBetween * workDayHours;

    return Math.ceil((firstDayHours + middleHours + lastDayHours) * 20) / 20;
  }

  /**
   * Calcualte progress work.
   * @param workedHours 
   * @param estimatedHour 
   * @returns 
   */
  private calculateProgress(workedHours: number, estimatedHour: number): number {
    if (workedHours >= estimatedHour) {
      return 99;
    }

    const progress = (workedHours / estimatedHour) * 100;

    return Math.min(Math.round(progress), 99);
  }
}