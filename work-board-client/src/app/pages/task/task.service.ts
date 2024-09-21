import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TaskModel } from '../../core/model/model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private form!: FormGroup;

  /**
   * Initialize and set base values.
   * @param fb Form Builder
   */
  constructor(private fb: FormBuilder) { }

  get taskForm(): FormGroup { return this.form = this.createFormGroup(); }

  get moduleID() { return this.form.get('moduleID') }

  get taskType() { return this.form.get('taskType') }

  get numRedmine() { return this.form.get('numRedmine') }

  get assignee() { return this.form.get('assignee') }

  get priority() { return this.form.get('priority') }

  get dateCreate() { return this.form.get('dateCreate') }

  get estimatedHour() { return this.form.get('estimatedHour') }

  get dateDelivery() { return this.form.get('dateDelivery') }

  /**
   * Initialize Form
   * @param task 
   * @returns Form
   */
  private createFormGroup(task?: TaskModel): FormGroup {
    return this.fb.group({
      moduleID: [task?.moduleID || null, Validators.required],
      taskName: [task?.taskName || null],
      taskType: [task?.taskType || null, Validators.required],
      numRedmine: [task?.numRedmine || null, Validators.pattern("^[0-9]*$")],
      assignee: [task?.assignee || null, Validators.required],
      priority: [task?.priority || null],
      dateCreate: [task?.dateCreate || null, Validators.required],
      estimatedHour: [task?.estimatedHour || null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      dateDelivery: [task?.dateDelivery || null, Validators.required],
      note: [task?.note || null],
    });
  }

  /**
   * Update value to form
   * @param task 
   */
  updateForm(task: TaskModel) { this.form.patchValue(task) }

  /**
   * Reset form
   * @param form 
   */
  resetForm() { this.form.reset }
}