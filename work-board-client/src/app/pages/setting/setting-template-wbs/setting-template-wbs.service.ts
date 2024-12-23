import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { TemplateWbsModels } from "../../../core/model/model";
import { CommonApiService } from "../../../core/services/common-api.service";

@Injectable({
  providedIn: 'root'
})
export class SettingTemplateWbsDialogService {

  private form!: FormGroup;

  /**
   * A constructor initializes a class's objects upon creation.
   * @param fb Form Builder
   */
  constructor(private fb: FormBuilder, private readonly commonApiService: CommonApiService) { }

  // Create form
  get settingTemplateWbsForm(): FormGroup { return this.form = this.createFormGroup(); }

  /**
   * Update value to form.
   * @param user 
   */
  public updateForm(user: TemplateWbsModels): void { this.form.patchValue(user) }

  /**
   * Reset form.
   * @param form 
   */
  public resetForm(): void { this.form.reset }

  /**
   * Get data init.
   */
  public getInit(): Observable<TemplateWbsModels | null> {
    return this.commonApiService.get<TemplateWbsModels>(this.commonApiService.urlSettingTemplateWBS).pipe(
      catchError(() => of(null))
    );
  }

  /**
   * Update template wbs
   * @param body 
   * @returns 
   */
  public updateSettingTemplateWBS(body?: TemplateWbsModels): Observable<boolean> {
    return this.commonApiService.post(this.commonApiService.urlSettingUpdateTemplateWBS, body).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  /**
   * Initialize Form.
   * @param user 
   * @returns Form
   */
  private createFormGroup(user?: TemplateWbsModels): FormGroup {
    return this.fb.group({
      moduleId: [user?.moduleId || null, [Validators.required, Validators.maxLength(4), Validators.pattern("^[A-Za-z]{1,2}(:M?)?$")]],
      taskType: [user?.taskType || null, [Validators.required, Validators.maxLength(4), Validators.pattern("^[A-Za-z]{1,2}(:M?)?$")]],
      taskName: [user?.taskName || null, [Validators.required, Validators.maxLength(4), Validators.pattern("^[A-Za-z]{1,2}(:M?)?$")]],
      assignee: [user?.assignee || null, [Validators.required, Validators.maxLength(4), Validators.pattern("^[A-Za-z]{1,2}(:M?)?$")]],
      estimatedHour: [user?.estimatedHour || null, [Validators.required, Validators.maxLength(4), Validators.pattern("^[A-Za-z]{1,2}(:M?)?$")]],
      workHour: [user?.workHour || null, [Validators.required, Validators.maxLength(4), Validators.pattern("^[A-Za-z]{1,2}(:M?)?$")]],
      dateWorkStart: [user?.dateWorkStart || null, [Validators.required, Validators.maxLength(4), Validators.pattern("^[A-Za-z]{1,2}(:M?)?$")]],
      dateWorkEnd: [user?.dateWorkEnd || null, [Validators.required, Validators.maxLength(4), Validators.pattern("^[A-Za-z]{1,2}(:M?)?$")]],
      dateCreate: [user?.dateCreate || null, [Validators.required, Validators.maxLength(4), Validators.pattern("^[A-Za-z]{1,2}(:M?)?$")]],
      dateDelivery: [user?.dateDelivery || null, [Validators.required, Validators.maxLength(4), Validators.pattern("^[A-Za-z]{1,2}(:M?)?$")]]
    });
  }
}