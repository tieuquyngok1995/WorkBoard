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
      taskName: 'Get up',
      taskType: 'Work',
      dateCreate: new Date(),
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 2),
      assignee: 'Tuan-VQ'
    },
    {
      taskName: 'Brush teeth',
      taskType: 'Home',
      dateCreate: new Date(),
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 1),
      assignee: 'Duy-TranB'
    },
    {
      taskName: 'Take a shower',
      taskType: 'Home',
      dateCreate: new Date(),
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 2),
      assignee: 'Duy-TranB'
    },
    {
      taskName: 'Check e-mail',
      taskType: 'Work',
      dateCreate: new Date(),
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 2),
      assignee: 'duy-pna'
    },
    {
      taskName: 'Walk dog',
      taskType: 'Home',
      dateCreate: new Date(),
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 1),
      assignee: 'duy-pna'
    }];

  pending = ['Get up1', 'Brush teeth2', 'Take a shower3', 'Check e-mail4', 'Walk dog5'];

  completed = ['Get up2', 'Brush teeth3', 'Take a shower4', 'Check e-mail5', 'Walk dog6'];

  newTask = [...this.initTask];
  inProgress = [...this.initInProgress];
}
