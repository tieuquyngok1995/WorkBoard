import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SearchModel } from "../../core/model/model";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private form!: FormGroup;

  /**
   * A constructor initializes a class's objects upon creation.
   * @param fb Form Builder
   */
  constructor(private fb: FormBuilder) { }

  // Get form
  get datePickerForm(): FormGroup { return this.form = this.createFormGroup(); }
  // Get value
  get dateStart() { return this.form.get('dateStart') }
  get dateEnd() { return this.form.get('dateEnd') }

  /**
   * Initialize FormGroup
   * @param taskProgress 
   * @returns FormGroup
   */
  private createFormGroup(taskProgress?: SearchModel): FormGroup {
    const today = new Date();
    return this.fb.group({
      dateStart: [taskProgress?.searchDateEnd || new Date(today.getFullYear(), today.getMonth() - 1, 26)],
      dateEnd: [taskProgress?.searchDateEnd || new Date(today.getFullYear(), today.getMonth(), 25)]
    });
  }
}
