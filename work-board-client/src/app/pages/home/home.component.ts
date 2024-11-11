import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { DialogConfig } from '../../config/dialog-config.model';
import { AuthService } from '../../core/services/auth.service';
import { UtilsService } from '../../core/services/utils.service';
import { DataService } from '../../shared/service/data.service';
import { MessageService } from '../../shared/service/message.service';
import { DialogMessageService } from '../../shared/service/dialog-message.service';
import { TaskDialog, TaskModel, TaskStatusModel, ToastModel } from '../../core/model/model';
import { ProgramMode, TaskType, TaskPriority, JobStatus, Search } from '../../core/enum/enums';

import { HomeService } from './home.service';
import { TaskComponent } from '../task/task.component';
import { TaskProgressComponent } from '../task-progress/task-progress.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public readonly Status = JobStatus
  public readonly TaskType = TaskType;
  public readonly TaskPriority = TaskPriority;

  public taskIcon!: string;
  public taskName!: string;

  public dataColWaiting: TaskModel[];
  public dataColProgress: TaskModel[];
  public dataColPending: TaskModel[];
  public dataColCompleted: TaskModel[];
  public dataToast: ToastModel[];

  public isRead!: boolean;

  private dataModel!: TaskStatusModel;
  private dataDialog!: TaskModel;

  private taskTypeMapping: { [key: number]: { icon: string; name: string } };

  /**
   * A constructor initializes a class's objects upon creation.
   */
  constructor(
    private readonly dialog: Dialog,
    private readonly authService: AuthService,
    private readonly dataService: DataService,
    private readonly homeService: HomeService,
    private readonly messageService: MessageService,
    private readonly confirmDialogService: DialogMessageService) {

    this.dataColWaiting = [];
    this.dataColProgress = [];
    this.dataColPending = [];
    this.dataColCompleted = [];
    this.dataToast = [];

    this.taskTypeMapping = this.createTaskTypeMapping();
  }

  /**
   * On init page.
   */
  public ngOnInit(): void {
    this.isRead = this.authService.roleID === 2;

    this.homeService.getInit();

    this.homeService.getData().subscribe(data => {
      if (data) {
        this.dataDialog = data.taskDialog;

        this.dataModel = UtilsService.getListTask(data.taskDialog.dataTaskStatus ?? [], data.listTasks);
        this.dataModel.progress = this.dataModel.progress.map(obj => {
          if (obj.dateWork) {
            obj.workHour += this.calculateWorkingHours(obj.dateWork);
            obj.dateWork = new Date();
          }
          return obj;
        });

        this.dataColWaiting = this.dataModel.waiting;
        this.dataColProgress = this.dataModel.progress;
        this.dataColPending = this.dataModel.pending;
        this.dataColCompleted = this.dataModel.completed;
      }
    })

    this.dataService.currentData.subscribe(data => {
      if (!data) {
        if (!this.dataModel) return;
        this.dataColWaiting = this.dataModel.waiting;
        this.dataColProgress = this.dataModel.progress;
        this.dataColPending = this.dataModel.pending;
        this.dataColCompleted = this.dataModel.completed;
      } else {
        if (data.message === null) {
          this.dataToast = [];
        }
        else if (data.message) {
          this.homeService.getInit();
          this.dataToast.push({ isShow: true, message: data.message });
        }
        else if (data.searchMode === Search.MODULE_ID) {
          this.dataColWaiting = this.dataModel.waiting.filter(obj => obj.moduleID.toUpperCase().includes(data.searchValue ?? ''));
          this.dataColProgress = this.dataModel.progress.filter(obj => obj.moduleID.toUpperCase().includes(data.searchValue ?? ''));
          this.dataColPending = this.dataModel.pending.filter(obj => obj.moduleID.toUpperCase().includes(data.searchValue ?? ''));
          this.dataColCompleted = this.dataModel.completed.filter(obj => obj.moduleID.toUpperCase().includes(data.searchValue ?? ''));
        } else if (data.searchMode === Search.TASK_NAME) {
          this.dataColWaiting = this.dataModel.waiting.filter(obj => obj.taskName && obj.taskName.toUpperCase().includes(data.searchValue ?? ''));
          this.dataColProgress = this.dataModel.progress.filter(obj => obj.taskName && obj.taskName.toUpperCase().includes(data.searchValue ?? ''));
          this.dataColPending = this.dataModel.pending.filter(obj => obj.taskName && obj.taskName.toUpperCase().includes(data.searchValue ?? ''));
          this.dataColCompleted = this.dataModel.completed.filter(obj => obj.taskName && obj.taskName.toUpperCase().includes(data.searchValue ?? ''));
        } else if (data.searchMode === Search.TASK_ASSIGNEE) {
          this.dataColWaiting = this.dataModel.waiting.filter(obj => obj.assigneeName && obj.assigneeName.toUpperCase().includes(data.searchValue ?? ''));
          this.dataColProgress = this.dataModel.progress.filter(obj => obj.assigneeName && obj.assigneeName.toUpperCase().includes(data.searchValue ?? ''));
          this.dataColPending = this.dataModel.pending.filter(obj => obj.assigneeName && obj.assigneeName.toUpperCase().includes(data.searchValue ?? ''));
          this.dataColCompleted = this.dataModel.completed.filter(obj => obj.assigneeName && obj.assigneeName.toUpperCase().includes(data.searchValue ?? ''));
        } else if (data.searchMode === Search.DATE_DELIVERY) {
          this.dataColWaiting = this.dataModel.waiting.filter(obj => UtilsService.isDateInRange(obj.dateDelivery, data.searchDateStart, data.searchDateEnd));
          this.dataColProgress = this.dataModel.progress.filter(obj => UtilsService.isDateInRange(obj.dateDelivery, data.searchDateStart, data.searchDateEnd));
          this.dataColPending = this.dataModel.pending.filter(obj => UtilsService.isDateInRange(obj.dateDelivery, data.searchDateStart, data.searchDateEnd));
          this.dataColCompleted = this.dataModel.completed.filter(obj => UtilsService.isDateInRange(obj.dateDelivery, data.searchDateStart, data.searchDateEnd));
        }
      }
    });
  }

  /**
   * Get task name and icon in screen
   * @param taskType 
   * @returns 
   */
  public getTasktype(taskType: number): { icon: string, name: string } {
    return this.taskTypeMapping[taskType];
  }

  /**
   * Open and process creating a new task.
   */
  public addTaskDialog(): void {
    // Open diag task
    this.dialog.open(TaskComponent, {
      disableClose: true,
      minWidth: DialogConfig.DEFAULT_WIDTH,
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
  public editTaskDialog(mode: JobStatus, id: number, isClone?: boolean): void {

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

    let jobStatus = ProgramMode.EDIT;
    if (mode === JobStatus.COMPLETED || this.isRead) jobStatus = ProgramMode.READ;
    else if (mode === JobStatus.WAITING && isClone) jobStatus = ProgramMode.CLONE;

    // Open diag task
    this.dialog.open(TaskComponent, {
      disableClose: true,
      minWidth: DialogConfig.DEFAULT_WIDTH,
      data: {
        mode: jobStatus,
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
          this.handleEditTask(mode, id, data, dialogResult.data, isClone)
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
  private handleEditTask(mode: JobStatus, id: number, task?: TaskModel, taskEdit?: TaskModel, isClone?: boolean) {
    if (UtilsService.objCompare(task, taskEdit)) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A002'));
      return;
    }

    if (mode === JobStatus.COMPLETED) {
      return;
    }

    if (taskEdit && isClone) {
      this.homeService.createTask(taskEdit).subscribe(data => {
        if (data) {
          this.dataColWaiting = [data, ...this.dataColWaiting];
        } else {
          this.confirmDialogService.openDialog(this.messageService.getMessage('E021'));
        }
      });
    } else {
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
      });
    }
  }

  /**
   * Delete the task based on the module ID.
   * @param mode 
   * @param id
   * @param moduleID 
   */
  public deleteTask(mode: JobStatus, id: number, moduleID: string, assignee: number): void {
    this.confirmDialogService.openDialog(this.messageService.getMessage('C001'), true).subscribe(result => {
      if (!result) return;

      this.homeService.delete(id, moduleID, assignee).subscribe(result => {
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
      minWidth: DialogConfig.DEFAULT_WIDTH,
      data: { data } as TaskDialog,
    }).closed.subscribe((dialogResult: any) => {
      if (dialogResult) {
        data = dialogResult.data;
        if (data) {
          const dateWorkStart = data.dateWorkStart instanceof Date ? data.dateWorkStart.toISOString() : (data.dateWorkStart ?? '');
          this.homeService.updateTaskProgress(id, moduleID, data.workHour, data.progress, dateWorkStart, data.note ?? '').subscribe(result => {
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
    const today = new Date();

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (mode === JobStatus.COMPLETED) {
      if (taskModel.progress !== 100) {
        this.confirmDialogService.openDialog(this.messageService.getMessage('A004'));
        return;
      } else {
        this.homeService.updateTaskStatus(JobStatus.COMPLETED, taskModel.id, taskModel.moduleID, taskModel.workHour, taskModel.progress, today);
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          0,
        );
      }
    } else {
      const id = event.container.id;
      let taskStatus = JobStatus.WAITING;
      if (id === 'progress') {
        taskStatus = JobStatus.PROGRESS;

        taskModel.dateWork = new Date();
      } else if (id === 'pending') {
        taskStatus = JobStatus.PENDING;

        taskModel.workHour += this.calculateWorkingHours(taskModel.dateWork);
        taskModel.progress = this.calculateProgress(taskModel.workHour, taskModel.estimatedHour);
        taskModel.dateWork = null;
      } else {
        taskModel.workHour = 0;
        taskModel.progress = 0;
        taskModel.dateWork = null;
      }

      const index = event.previousContainer.data.findIndex(obj => obj.id === taskModel.id);
      if (index !== -1) event.previousContainer.data[index] = { ...event.previousContainer.data[index], ...taskModel };

      this.homeService.updateTaskStatus(taskStatus, taskModel.id, taskModel.moduleID, taskModel.workHour, taskModel.progress, taskModel.dateWork);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  /**
   * Event close toask noti.
   * @param rowIndex 
   */
  public closeToast(rowIndex: number) {
    if (rowIndex >= 0 && rowIndex < this.dataToast.length) {
      this.dataToast[rowIndex].isShow = false;

      const hiddenMessage = this.dataToast.splice(rowIndex, 1)[0];
      this.dataToast.unshift(hiddenMessage);
    }

    if (this.dataToast.every(item => item.isShow === false)) this.dataService.sendData(null);
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
      return Math.ceil((morningEnd - morningStart + Math.min(hours - afternoonStart, afternoonEnd - afternoonStart)) * 20) / 20;
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

  /**
   * Create mapping task type.
   * @returns 
   */
  private createTaskTypeMapping(): { [key: number]: { icon: string; name: string } } {
    return {
      0: { icon: 'bi bi-file-earmark-code', name: 'Coding' },
      1: { icon: 'bi bi-file-earmark-code', name: 'Review' },
      2: { icon: 'bi bi-file-earmark-code', name: 'Fix Bug' },
      3: { icon: 'bi bi-file-earmark-bar-graph', name: 'Testcase' },
      4: { icon: 'bi bi-file-earmark-bar-graph', name: 'Review' },
      5: { icon: 'bi bi-file-earmark-bar-graph', name: 'Fix Bug' },
      6: { icon: 'bi bi-file-earmark-medical', name: 'Testing' },
      7: { icon: 'bi bi-file-earmark-medical', name: 'Review' },
      8: { icon: 'bi bi-file-earmark-medical', name: 'Fix Bug' }
    }
  }
}