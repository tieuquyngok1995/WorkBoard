import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TaskModel } from '../../core/model/model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private form: FormGroup;

  /**
   * Initialize and set base values
   * @param fb Form Builder
   */
  constructor(private fb: FormBuilder) {
    this.form = this.createFormGroup();
  }

  /**
   * Initialize FormGroup
   * @param task 
   * @returns FormGroup
   */
  private createFormGroup(task?: TaskModel): FormGroup {
    return this.fb.group({
      moduleID: [task?.moduleID || null, Validators.required],
      taskName: [task?.taskName || null],
      taskType: [task?.taskType || null, Validators.required],
      numRedmine: [task?.numRedmine || null, Validators.pattern("^[0-9]*$")],
      assignee: [task?.assignee || null, Validators.required],
      priority: [task?.priority || null],
      dateCreate: [task?.dateCreate || '', Validators.required],
      estimatedHour: [task?.estimatedHour || '', [Validators.required, Validators.pattern("^[0-9]*$")]],
      dateDelivery: [task?.dateDelivery || '', Validators.required],
      note: [task?.note || null],
    });
  }

  get taskForm(): FormGroup { return this.form }

  get moduleIDControl() { return this.form.get('moduleID') }

  get taskTypeControl() { return this.form.get('taskType') }

  get numRedmineControl() { return this.form.get('numRedmine') }

  get assigneeControl() { return this.form.get('assignee') }

  get priorityControl() { return this.form.get('priority') }

  get dateCreateControl() { return this.form.get('dateCreate') }

  get estimatedHourControl() { return this.form.get('estimatedHour') }

  get dateDeliveryControl() { return this.form.get('dateDelivery') }

  updateForm(task: TaskModel) { this.form.patchValue(task) }
}