import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
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
      minWidth: '300px',
      data: {
        animal: 'panda',
      },
    });
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

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