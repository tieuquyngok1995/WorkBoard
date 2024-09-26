import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TaskModel } from '../../core/model/model';

@Injectable({
  providedIn: 'root'
})
export class TaskProgressService {

  private form!: FormGroup;

  /**
   * A constructor initializes a class's objects upon creation.
   * @param fb Form Builder
   */
  constructor(private fb: FormBuilder) { }

  get taskProgressForm(): FormGroup { return this.form = this.createFormGroup() }

  get workHour() { return this.form.get('workHour') }

  get progress() { return this.form.get('progress') }

  get note() { return this.form.get('note') }

  /**
   * Reset form
   * @param form 
   */
  public resetForm(): void { this.form.reset }

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
}