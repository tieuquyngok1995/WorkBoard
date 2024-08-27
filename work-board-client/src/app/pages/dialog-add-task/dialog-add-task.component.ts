import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { DialogData } from '../home/home.component';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.css']
})
export class DialogAddTaskComponent {
  constructor(@Inject(DIALOG_DATA) public data: DialogData) { }
}
