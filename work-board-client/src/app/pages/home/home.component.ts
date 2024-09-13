import { Dialog } from '@angular/cdk/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { TaskComponent } from '../task/task.component';
import { TaskModel } from 'src/app/core/model/model';
import { ProgramMode } from 'src/app/core/enum/ProgramMode';
export interface DialogData {
  mode: ProgramMode;
  task?: TaskModel;
  index?: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public readonly TypeCoding: number = 1;
  public readonly TypeTesting: number = 2;
  public readonly TypeReview: number = 3;
  public readonly TypeFixBug: number = 4;

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

  constructor(public dialog: Dialog, private formBuilder: FormBuilder) {
    this.filterForm = new FormGroup({
      assignee: new FormControl<string[]>(['']),
      taskName: new FormControl(''),
      taskType: new FormControl(''),
      dateCreate: new FormControl(''),
      dateDelivery: new FormControl(''),
    })

    this.subscriptionFunction();
    this.initDataTest();

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


  openDialog() {
    this.dialog.open(TaskComponent, {
      disableClose: true,
      minWidth: '300px',
      data: {
        mode: ProgramMode.CREATE
      } as DialogData,
    }).closed.subscribe((result: any) => {
      if (!result.isDelete) {
        this.initTask = [result.data, ...this.initTask];
        //this.applyFilter();
      }
    });
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
        taskTypeId: 1,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Duy-TranB',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      },
      {
        moduleID: '2',
        taskName: 'Pick up groceries',
        taskTypeId: 1,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Thinh-NT',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      },
      {
        moduleID: '3',
        taskName: 'Go home',
        taskTypeId: 1,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Tuan-VQ',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      },
      {
        moduleID: '3',
        taskName: 'Go home',
        taskTypeId: 2,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Tuan-VQ',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      },
      {
        moduleID: '3',
        taskName: 'Go home',
        taskTypeId: 2,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Tuan-VQ',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      },
      {
        moduleID: '3',
        taskName: 'Go home',
        taskTypeId: 2,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Tuan-VQ',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      },
      {
        moduleID: '3',
        taskName: 'Go home',
        taskTypeId: 3,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Tuan-VQ',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      },
      {
        moduleID: '3',
        taskName: 'Go home',
        taskTypeId: 3,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Tuan-VQ',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      },
      {
        moduleID: '3',
        taskName: 'Go home',
        taskTypeId: 3,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Tuan-VQ',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      },
      {
        moduleID: '3',
        taskName: 'Go home',
        taskTypeId: 4,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Tuan-VQ',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      },
      {
        moduleID: '3',
        taskName: 'Go home',
        taskTypeId: 4,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Tuan-VQ',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      },
      {
        moduleID: '3',
        taskName: 'Go home',
        taskTypeId: 4,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Tuan-VQ',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      },
      {
        moduleID: '3',
        taskName: 'Go home',
        taskTypeId: 4,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Tuan-VQ',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      },
      {
        moduleID: '3',
        taskName: 'Go home',
        taskTypeId: 4,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Tuan-VQ',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      },
      {
        moduleID: '3',
        taskName: 'Go home',
        taskTypeId: 4,
        taskType: 'Work',
        numRedmine: '',
        assignee: 'Tuan-VQ',
        dateCreate: new Date(),
        estimatedHour: 2,
        dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
        note: ''
      }];
  }



  initInProgress = [
    {
      moduleID: '3',
      taskName: 'Go home',
      taskTypeId: 4,
      taskType: 'Work',
      numRedmine: '',
      assignee: 'Tuan-VQ',
      dateCreate: new Date(),
      estimatedHour: 2,
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
      note: ''
    }];

  initPending = [
    {
      moduleID: '3',
      taskName: 'Go home',
      taskTypeId: 4,
      taskType: 'Work',
      numRedmine: '',
      assignee: 'Tuan-VQ',
      dateCreate: new Date(),
      estimatedHour: 2,
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
      note: ''
    }];

  initCompleted = [
    {
      moduleID: '3',
      taskName: 'Go home',
      taskTypeId: 4,
      taskType: 'Work',
      numRedmine: '',
      assignee: 'Tuan-VQ',
      dateCreate: new Date(),
      estimatedHour: 2,
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
      note: ''
    }];

  newTask = [...this.initTask];
  inProgress = [...this.initInProgress];
  pending = [...this.initPending];
  completed = [...this.initCompleted];
}
