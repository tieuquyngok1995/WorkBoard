import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { DialogData } from '../home/home.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskModel } from '../home/home.model';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.css']
})
export class DialogAddTaskComponent implements OnInit {
  taskForm: FormGroup;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  constructor(@Inject(DIALOG_DATA) public data: DialogData, public dialogRef: DialogRef<DialogAddTaskComponent>,
    private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
      moduleID: [''],
      taskName: [''],
      taskType: [''],
      assignee: [''],
      dateCreate: [''],
      estimatedHour: [''],
      dateDelivery: [''],
    })
  }

  ngOnInit() {

  }

  submit() {
    const taskForm: TaskModel = this.taskForm.value;
    console.log(taskForm);
    this.dialogRef.close();
  }
}
