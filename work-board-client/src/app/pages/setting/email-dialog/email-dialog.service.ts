import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TemplateSendMailListModel, TemplateSendMailModel } from '../../../core/model/model';
import { catchError, map, Observable, of } from 'rxjs';
import { CommonApiService } from 'src/app/core/services/common-api.service';


@Injectable({
  providedIn: 'root'
})
export class EmailDialogService {

  private form!: FormGroup;

  /**
   * A constructor initializes a class's objects upon creation.
   * @param fb Form Builder
   */
  constructor(private fb: FormBuilder, private readonly commonApiService: CommonApiService) { }

  // Create form
  get sendMailForm(): FormGroup { return this.form = this.createFormGroup(); }
  // Get value
  get template() { return this.form.get('templateID') }
  get subject() { return this.form.get('subject') }
  get content() { return this.form.get('content') }
  get toUser() { return this.form.get('toUser') }

  /**
   * Update value to form.
   * @param templateSendMail 
   */
  public updateForm(templateSendMail: TemplateSendMailModel): void { this.form.patchValue(templateSendMail) }

  /**
   * Reset form.
   * @param form 
   */
  public resetForm(): void { this.form.reset }

  /**
   * Initialize Form.
   * @param templateSendMail 
   * @returns Form
   */
  private createFormGroup(templateSendMail?: TemplateSendMailModel): FormGroup {
    return this.fb.group({
      templateID: [templateSendMail?.templateID || null, [Validators.required, Validators.maxLength(100)]],
      subject: [templateSendMail?.subject || null, [Validators.required, Validators.maxLength(100)]],
      content: [templateSendMail?.content || null, Validators.required],
      toUser: [templateSendMail?.toUser || null]
    });
  }

  public getTemplateSendMail(): Observable<TemplateSendMailListModel | null> {
    return this.commonApiService.get<TemplateSendMailListModel>(this.commonApiService.urlSettingGetTemplate).pipe(
      catchError(() => of(null))
    );
  }

  /**
   * Update template send mail
   * @param body 
   * @returns 
   */
  public updateTemplateSendMail(body?: TemplateSendMailModel): Observable<boolean> {
    return this.commonApiService.post(this.commonApiService.urlSettingUpdateTemplate, body).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}