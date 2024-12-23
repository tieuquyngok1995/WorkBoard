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

  // Create form
  get taskProgressForm(): FormGroup { return this.form = this.createFormGroup() }
  // Get value
  get progress() { return this.form.get('progress') }

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
      workHour: [taskProgress?.workHour || null, [Validators.required, Validators.pattern("^(0|[0-9][0-9]{0,2}(\.[0-9]{1,2})?|999(\.9{1,2})?)$")]],
      progress: [taskProgress?.progress || null, Validators.required],
      dateWorkStart: [taskProgress?.dateWorkStart || null, [Validators.required]],
      note: [taskProgress?.note || null],
    });
  }
}