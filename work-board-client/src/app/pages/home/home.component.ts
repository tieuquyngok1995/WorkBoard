import { Dialog } from '@angular/cdk/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  allAssignees = [
    {
      value: 'duy-tranb',
      displayName: 'Duy-TranB'
    },
    {
    value: 'duy-pna',
    displayName: 'Duy-PNA'
  },
  {
    value: 'tuan-vq',
    displayName: 'Tuan-VQ'
  },
  {
    value: 'thinh-nt',
    displayName: 'Thinh-NT'
  }]

  filterForm: FormGroup;

  constructor(public dialog: Dialog, private formBuilder: FormBuilder) {
    this.filterForm = new FormGroup({
      assignee: new FormControl<string[]>(['']),
      taskName: new FormControl(''),
      taskType: new FormControl(''),
      dateCreate: new FormControl(''),
      dateDelivery: new FormControl(''),
    })

    this.subscriptionFunction();

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

  toggleAllSelection(event:any) {
    if (event._selected) {
      this.filterForm.controls['assignee'].patchValue([...this.allAssignees.map(element => element.value)])
      event._selected = true;
    } else {
      this.filterForm.controls['assignee'].setValue([]);
    }
  }


  openDialog() {
    this.dialog.open(DialogAddTaskComponent, {
      disableClose: true,
      minWidth: '300px',
      data: {
        animal: 'panda',
      },
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

  
  initTask = [
    {
      taskName: 'Get to work',
      taskType: 'Work',
      dateCreate: new Date(),
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 24),
      assignee: 'duy-tranb'
    },
    {
      taskName: 'Pick up groceries',
      taskType: 'Home',
      dateCreate: new Date(),
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 2),
      assignee: 'thinh-nt'
    },
    {
      taskName: 'Go home',
      taskType: 'Home',
      dateCreate: new Date(),
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 1),
      assignee: 'tuan-vq'
    },
    {
      taskName: 'Fall asleep',
      taskType: 'Home',
      dateCreate: new Date(),
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 2),
      assignee: 'duy-tranb'
    }];

  initInProgress = [
    {
      taskName: 'Get up',
      taskType: 'Work',
      dateCreate: new Date(),
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 2),
      assignee: 'tuan-vq'
    },
    {
      taskName: 'Brush teeth',
      taskType: 'Home',
      dateCreate: new Date(),
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 1),
      assignee: 'duy-tranb'
    },
    {
      taskName: 'Take a shower',
      taskType: 'Home',
      dateCreate: new Date(),
      dateDelivery: new Date(new Date().getTime() + 60 * 60 * 1000 * 2),
      assignee: 'duy-tranb'
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
