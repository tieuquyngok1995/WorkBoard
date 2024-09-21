import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


import { FormGroup, FormControl, FormBuilder } from '@angular/forms'

import { TaskDialog, TaskModel } from '../../core/model/model';
import { ProgramMode, TaskType, TaskPriority, JobStatus } from '../../core/enum/enums';

import { TaskComponent } from '../task/task.component';
import { TaskProgressComponent } from '../task-progress/task-progress.component';
import { MessageService } from 'src/app/shared/service/message.service';
import { DialogMessageService } from 'src/app/shared/service/dialog-message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public readonly Status = JobStatus
  public readonly TaskType = TaskType;
  public readonly TaskPriority = TaskPriority;

  private readonly sizeDialog = '300px';
  private readonly dataDialog!: TaskModel;


  allAssignees = [
    {
      value: 'Duy-TranB',
      displayName: 'Duy-TranB'
    },
    {
      value: 'Duy-PNA',
      displayName: 'Duy-PNA'
    },
    {
      value: 'Tuan-VQ',
      displayName: 'Tuan-VQ'
    },
    {
      value: 'Thinh-NT',
      displayName: 'Thinh-NT'
    }]

  filterForm: FormGroup;
  initTask: TaskModel[] = [];

  /**
   * Register and initialize.
   * @param dialog 
   * @param formBuilder 
   */
  constructor(
    private dialog: Dialog,
    private messageService: MessageService,
    private confirmDialogService: DialogMessageService,


    private formBuilder: FormBuilder) {
    this.filterForm = new FormGroup({
      assignee: new FormControl<string[]>(['']),
      taskName: new FormControl(''),
      taskType: new FormControl(''),
      dateCreate: new FormControl(''),
      dateDelivery: new FormControl(''),
    })

    this.subscriptionFunction();
    this.initDataTest();


    // TODO:
    this.dataDialog = {
      moduleID: '',
      taskName: null,
      taskType: null,
      numRedmine: null,
      assignee: null,
      priority: null,
      dateCreate: null,
      estimatedHour: 0,
      workHour: 0,
      dateDelivery: null,
      progress: 0,
      note: null,
      listTaskType: [
        { key: 0, value: 'Coding' },
        { key: 1, value: 'Review' },
        { key: 2, value: 'Testing' },
        { key: 3, value: 'Fixbug' }
      ],
      listPriority: [
        { key: 0, value: 'High' },
        { key: 1, value: 'Medium' },
        { key: 2, value: 'Low' }
      ],
      listAssignee: [
        { key: 0, value: 'Tuan-VQ' },
        { key: 1, value: 'Thinh-NT' },
        { key: 2, value: 'Duy-PNA' },
        { key: 3, value: 'Hieu-MTH' }
      ]
    }
  }

  /**
   * Open and process creating a new task.
   */
  addTaskDialog() {
    this.dialog.open(TaskComponent, {
      disableClose: true,
      minWidth: this.sizeDialog,
      data: {
        mode: ProgramMode.CREATE,
        data: this.dataDialog
      } as TaskDialog,
    }).closed.subscribe((result: any) => {
      if (result) {
        this.initTask = [result.data, ...this.initTask];
      }
    });
  }

  /**
   * Edit the task with the value of the module ID.
   * @param moduleID 
   */
  editTaskDialog(moduleID: string) {
    const data = this.initTask.find(obj => obj.moduleID === moduleID);

    this.dialog.open(TaskComponent, {
      disableClose: true,
      minWidth: this.sizeDialog,
      data: {
        mode: ProgramMode.EDIT,
        data: {
          ...data,
          listAssignee: this.dataDialog.listAssignee,
          listPriority: this.dataDialog.listPriority,
          listTaskType: this.dataDialog.listTaskType
        }
      } as TaskDialog,
    }).closed.subscribe((result: any) => {
      if (result) {
        if (result.isDelete) {
          this.initTask = this.initTask.filter(obj => obj.moduleID !== moduleID);
        } else {
          this.initTask = this.initTask.map(obj => obj.moduleID === moduleID ? { ...obj, ...result.data } : obj);
        }
      }
    });
  }

  public deleteTask(mode: JobStatus, moduleID: string): void {
    this.confirmDialogService.openDialog(this.messageService.getMessage('C001'), true).subscribe(result => {
      if (!result) return;

      if (mode === JobStatus.WAITING) {
        this.initTask = this.initTask.filter(obj => obj.moduleID !== moduleID);
      } else if (mode === JobStatus.PROGRESS) {
        this.inProgress = this.inProgress.filter(obj => obj.moduleID !== moduleID);
      } else if (mode === JobStatus.PENDING) {
        this.pending = this.pending.filter(obj => obj.moduleID !== moduleID);
      }
    });
  }
  /**
   * Edit task progress with the value of the module ID.
   * @param moduleID 
   */
  editTaskProgressDialog(moduleID: string) {
    let data = this.inProgress.find(obj => obj.moduleID === moduleID);

    this.dialog.open(TaskProgressComponent, {
      disableClose: true,
      minWidth: this.sizeDialog,
      data: { data } as TaskDialog,
    }).closed.subscribe((result: any) => {
      if (result) {
        this.inProgress = this.inProgress.map(obj => obj.moduleID === moduleID ? { ...obj, ...result.data } : obj);
      }
    });
  }

  private subscriptionFunction() {
    this.filterForm.controls['assignee'].valueChanges.subscribe(valueFilter => {
      this.newTask = this.initTask.filter(element => {
        if (Array.isArray(valueFilter) && (valueFilter.includes(element.assignee)))
          return true;
        return false;
      });

      this.inProgress = this.initInProgress.filter(element => {
        if (Array.isArray(valueFilter) && (valueFilter.includes(element.assignee)))
          return true;
        return false;
      });
    })
  }

  toggleAllSelection(event: any) {
    if (event._selected) {
      this.filterForm.controls['assignee'].patchValue([...this.allAssignees.map(element => element.value)])
      event._selected = true;
    } else {
      this.filterForm.controls['assignee'].setValue([]);
    }
  }

  public getProgress(progress: number) {
    progress = progress > 50 ? progress - 50 : progress;
    return Math.round(progress * 3.6) + 'deg'
  }


  drop(event: CdkDragDrop<any[]>) {
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

  applyFilter() {
    let valueFilter = this.filterForm.controls['assignee'].value ?? [];
    this.newTask = this.initTask.filter(element => {
      if (Array.isArray(valueFilter) && (valueFilter.includes(element.assignee)))
        return true;
      return false;
    });

    this.inProgress = this.initInProgress.filter(element => {
      if (Array.isArray(valueFilter) && (valueFilter.includes(element.assignee)))
        return true;
      return false;
    });
  }

  initDataTest() {
    this.initTask = [
      {
        moduleID: '1',
        taskName: 'Get to work',
        taskType: 0,
        numRedmine: '',
        assignee: 'Duy-TranB',
        priority: 0,
        dateCreate: new Date('2024/09/11'),
        estimatedHour: 2,
        workHour: 0,
        dateDelivery: new Date('2024/09/23'),
        progress: 0,
        note: '',
        listAssignee: null,
        listPriority: null,
        listTaskType: null
      },
      {
        moduleID: '2',
        taskName: 'Pick up groceries',
        taskType: 0,
        numRedmine: '',
        assignee: 'Thinh-NT',
        priority: 1,
        dateCreate: new Date(),
        estimatedHour: 2,
        workHour: 0,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        progress: 0,
        note: '',
        listAssignee: null,
        listPriority: null,
        listTaskType: null
      },
      {
        moduleID: '3',
        taskName: 'Go home',
        taskType: 1,
        numRedmine: '',
        assignee: 'Tuan-VQ',
        priority: 3,
        dateCreate: new Date(),
        estimatedHour: 2,
        workHour: 0,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        progress: 0,
        note: '',
        listAssignee: null,
        listPriority: null,
        listTaskType: null
      }
    ];
  }



  initInProgress = [
    {
      moduleID: '4',
      taskName: 'Go home',
      taskType: 4,
      progress: 30,
      numRedmine: '',
      assignee: 'Tuan-VQ',
      priority: 1,
      dateCreate: new Date(),
      estimatedHour: 2,
      workHour: 0,
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
      note: ''
    }];

  initPending = [
    {
      moduleID: '5',
      taskName: 'Go home',
      taskType: 4,
      progress: 60,
      numRedmine: '',
      assignee: 'Tuan-VQ',
      priority: 1,
      dateCreate: new Date(),
      estimatedHour: 2,
      workHour: 0,
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
      note: ''
    }];

  initCompleted = [
    {
      moduleID: '6',
      taskName: 'Go home',
      taskType: 4,
      progress: 90,
      numRedmine: '',
      assignee: 'Tuan-VQ',
      priority: 1,
      dateCreate: new Date(),
      estimatedHour: 2,
      workHour: 0,
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
      note: ''
    }];

  newTask = [...this.initTask];
  inProgress = [...this.initInProgress];
  pending = [...this.initPending];
  completed = [...this.initCompleted];
}
