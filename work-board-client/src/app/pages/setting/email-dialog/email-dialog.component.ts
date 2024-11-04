import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { DataListOption, SendMailDialog, TemplateSendMailModel } from 'src/app/core/model/model';
import { fadeAnimation } from 'src/app/shared/animations/animations';
import { DialogMessageService } from 'src/app/shared/service/dialog-message.service';
import { MessageService } from 'src/app/shared/service/message.service';
import { EmailDialogService } from './email-dialog.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css'],
  animations: [fadeAnimation]
})
export class EmailDialogComponent implements OnInit {
  // Check close dialog
  public isClose!: boolean;
  public isDisabled!: boolean;
  // User form
  public sendMailForm!: FormGroup;

  // Data list
  public dataTemplate!: DataListOption[];
  public dataUser!: DataListOption[];
  public dataToUser: WritableSignal<DataListOption[]>;

  private emplatesSendMail!: TemplateSendMailModel[];

  /**
   * A constructor initializes a class's objects upon creation.
   */
  constructor(
    @Inject(DIALOG_DATA)
    private readonly dialog: SendMailDialog,
    private readonly emailService: EmailDialogService,
    private readonly dialogRef: DialogRef<any>,
    private readonly messageService: MessageService,
    private readonly confirmDialogService: DialogMessageService) {

    this.isDisabled = true;
    this.sendMailForm = emailService.sendMailForm;
    this.dataToUser = signal<DataListOption[]>([]);
  }

  // Get control
  get template() { return this.emailService.template; }
  get subject() { return this.emailService.subject; }
  get content() { return this.emailService.content; }
  get toUser() { return this.emailService.toUser; }

  /**
   * Handle data init
   */
  public ngOnInit(): void {
    // Add data after call api init
    this.emailService.getTemplateSendMail().subscribe(data => {
      if (data) {
        this.dataTemplate = data.dataTemplate ?? [];
        this.dataUser = data.dataToUser ?? [];
        this.emplatesSendMail = data.templates ?? [];
      }
    });

    // Event change tempalte
    this.template?.valueChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe(value => {
      if (value === null || value === undefined || value === '') {
        this.sendMailForm.reset();
        this.dataToUser = signal<DataListOption[]>([]);

        this.isDisabled = true;
      } else {
        const template = this.emplatesSendMail.find(item => item.templateID === value);

        if (template) {
          this.subject?.setValue(template.subject ?? '');
          this.content?.setValue(template.content ?? '');

          const keys = template.toUser.split(',').map(key => Number(key));
          this.dataToUser = signal<DataListOption[]>(this.dataUser.filter(item => keys.includes(item.key)));

          this.isDisabled = false;
        }
      }
    });
  }

  /**
   * Event clear chip on screen
   * @returns 
   */
  public removeChipUser(index: number): void {
    this.dataToUser.update(list =>
      list.filter((_, i) => i !== index)
    );
  }

  /**
   * Event add chip on screen
   * @returns 
   */
  public addChipUser(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.dataToUser.update(toUser => [...toUser, { key: this.toUser?.value, value: value }]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  /**
   * Event save or update template send email
   * @returns 
   */
  public save(): void {
    if (!this.sendMailForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));
      return;
    }

    if (this.dataToUser().length === 0) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('E019'));
      return;
    }

    const dataForm: TemplateSendMailModel = this.sendMailForm.value;
    dataForm.toUser = this.dataToUser().map(item => item.key).join(',');

    const template = this.dataTemplate.find(item => item.key === dataForm.templateID) ?? null;

    if (template) {
      dataForm.templateName = template.value;
    } else {
      dataForm.templateName = dataForm.templateID + '';
      dataForm.templateID = null;
    }

    this.emailService.updateTemplateSendMail(dataForm).subscribe(data => {
      if (!data) {
        this.confirmDialogService.openDialog(this.messageService.getMessage('E020'));
      } else {
        this.confirmDialogService.openDialog(this.messageService.getMessage('I001'));
        this.isDisabled = false;
      }
    });
  }

  /**
   * Event send mail.
   */
  public sendMail(): void {
    if (!this.sendMailForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));
      return;
    }

    if (this.dataToUser().length === 0) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('E019'));
      return;
    }

    const dataForm: TemplateSendMailModel = this.sendMailForm.value;
    dataForm.toUser = this.dataToUser().map(item => item.key).join(',');

    this.emailService.sendMail(dataForm).subscribe(data => {
      if (!data) {
        this.confirmDialogService.openDialog(this.messageService.getMessage('E022'));
      } else {
        this.confirmDialogService.openDialog(this.messageService.getMessage('I002'));
      }
    });
  }

  /**
   * Event close dialog 
   */
  public cancel(): void {
    this.isClose = true;
    // Delay close 300ms
    setTimeout(() => { this.dialogRef.close(); }, 300);
  }
}
