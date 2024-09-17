import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TaskModel } from '../../core/model/model';

@Injectable({
  providedIn: 'root'
})
export class TaskProgressService {

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
   * @param taskProgress 
   * @returns FormGroup
   */
  private createFormGroup(taskProgress?: TaskModel): FormGroup {
    return this.fb.group({
      workHour: [taskProgress?.workHour || null, Validators.required],
      progress: [taskProgress?.progress || null, Validators.required],
      note: [taskProgress?.note || null],
    });
  }

  get taskProgressForm(): FormGroup { return this.form }

  get workHourControl() { return this.form.get('workHour') }

  get progressControl() { return this.form.get('progress') }

  updateForm(taskProgress: TaskModel) { this.form.patchValue(taskProgress) }
}