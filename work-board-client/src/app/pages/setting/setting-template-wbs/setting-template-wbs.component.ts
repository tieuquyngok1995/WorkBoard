import { FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';

import { fadeAnimation } from '../../../shared/animations/animations';
import { MessageService } from '../../../shared/service/message.service';
import { DialogMessageService } from '../../../shared/service/dialog-message.service';
import { SettingTemplateWbsDialogService } from './setting-template-wbs.service';
import { TemplateWbsModels } from 'src/app/core/model/model';

@Component({
  selector: 'app-setting-template-wbs',
  templateUrl: './setting-template-wbs.component.html',
  styleUrls: ['./setting-template-wbs.component.css'],
  animations: [fadeAnimation]
})
export class SettingTemplateWbsComponent implements OnInit {
  // Check close dialog
  public isClose!: boolean;
  // User form
  public templateWbsForm!: FormGroup;

  /**
   * A constructor initializes a class's objects upon creation.
   */
  constructor(
    private readonly dialogRef: DialogRef<any>,
    private readonly messageService: MessageService,
    private readonly confirmDialogService: DialogMessageService,
    private readonly settingTemplateWbsService: SettingTemplateWbsDialogService) {

    this.templateWbsForm = settingTemplateWbsService.settingTemplateWbsForm;
  }

  /**
   * Handle data init
   */
  public ngOnInit(): void {
    this.settingTemplateWbsService.getInit().subscribe(data => {
      if (data) {
        this.settingTemplateWbsService.updateForm(data);
      }
    })
  }

  public save(): void {
    if (!this.templateWbsForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));
      return;
    }

    const dataForm: TemplateWbsModels = this.templateWbsForm.value;
    this.settingTemplateWbsService.updateSettingTemplateWBS(dataForm).subscribe(data => {
      if (!data) {
        this.confirmDialogService.openDialog(this.messageService.getMessage('E023'));
      } else {
        this.confirmDialogService.openDialog(this.messageService.getMessage('I003'));
      }
    });
  }

  /**
   * Clear setting
   */
  public clear(): void {
    this.confirmDialogService.openDialog(this.messageService.getMessage('C003'), true).subscribe(result => {
      if (!result) return;

      this.settingTemplateWbsService.resetForm();
      const formElement = document.querySelector('form');
      if (formElement) {
        formElement.dispatchEvent(new Event('reset'));
      }
    });
  }

  /**
   * Close dialog
   */
  public cancel(): void {
    this.isClose = true;
    // Delay close 300ms
    setTimeout(() => { this.dialogRef.close(); }, 300);
  }
}