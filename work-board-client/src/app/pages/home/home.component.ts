import { Dialog } from '@angular/cdk/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public dialog: Dialog) { }

  openDialog() {
    this.dialog.open(DialogAddTaskComponent, {
      disableClose: true,
      minWidth: '300px',
      data: {
        animal: 'panda',
      },
    });
  }

  newTask = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  inProgress = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  pending = ['Get up1', 'Brush teeth2', 'Take a shower3', 'Check e-mail4', 'Walk dog5'];

  completed = ['Get up2', 'Brush teeth3', 'Take a shower4', 'Check e-mail5', 'Walk dog6'];

  drop(event: CdkDragDrop<string[]>) {
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
}