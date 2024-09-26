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

  // Get form
  get taskForm(): FormGroup { return this.form = this.createFormGroup(); }

  /**
   * Update value to form.
   * @param task 
   */
  public updateForm(task: TaskModel): void { this.form.patchValue(task) }

  /**
   * Reset form.
   * @param form 
   */
  public resetForm(): void { this.form.reset }

  /**
   * Initialize Form.
   * @param task 
   * @returns Form
   */
  private createFormGroup(task?: TaskModel): FormGroup {
    return this.fb.group({
      moduleID: [task?.moduleID || null, [Validators.required, Validators.maxLength(20)]],
      taskName: [task?.taskName || null, Validators.maxLength(100)],
      type: [task?.type || null, Validators.required],
      numRedmine: [task?.numRedmine || null, [Validators.pattern("^[0-9]*$"), Validators.max(9999999)]],
      assignee: [task?.assignee || null, Validators.required],
      priority: [task?.priority || null],
      dateCreate: [task?.dateCreate || null, Validators.required],
      estimatedHour: [task?.estimatedHour || null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(9999999)]],
      dateDelivery: [task?.dateDelivery || null, Validators.required],
      note: [task?.note || null, Validators.maxLength(1000)],
    });
  }
}