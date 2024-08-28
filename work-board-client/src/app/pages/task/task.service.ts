import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskModel } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createFormGroup();
  }

  private createFormGroup(task?: TaskModel): FormGroup {
    return this.fb.group({
      moduleID: [task?.moduleID || null, Validators.required],
      taskName: [task?.taskName || null],
      taskType: [task?.taskType || null, Validators.required],
      numRedmine: [task?.numRedmine || null, Validators.pattern("^[0-9]*$")],
      assignee: [task?.assignee || null, Validators.required],
      dateCreate: [task?.dateCreate || '', Validators.required],
      estimatedHour: [task?.estimatedHour || '', Validators.required, Validators.pattern("^[0-9]*$")],
      dateDelivery: [task?.dateDelivery || '', Validators.required],
      note: [task?.note || null],
    });
  }

  get taskForm(): FormGroup { return this.form }

  get moduleIDControl() { return this.form.get('moduleID') }

  get taskTypeControl() { return this.form.get('taskType') }

  get numRedmineControl() { return this.form.get('numRedmine') }

  get assigneeControl() { return this.form.get('assignee') }

  get dateCreateControl() { return this.form.get('dateCreate') }

  get estimatedHourControl() { return this.form.get('estimatedHour') }

  get dateDeliveryControl() { return this.form.get('dateDelivery') }

  updateForm(user: TaskModel) { this.form.patchValue(user) }
}