import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UserModel } from '../../core/model/model';
import { CommonApiService } from '../../core/services/common-api.service';
import { MessageService } from '../../shared/service/message.service';
import { DialogMessageService } from '../../shared/service/dialog-message.service';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public signInForm: FormGroup;
  public signUpForm: FormGroup;

  /**
   * Initialize and set base values
   * @param data 
   * @param dialogRef 
   * @param taskService 
   */
  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private commonApiService: CommonApiService,
    private confirmDialogService: DialogMessageService) {
    this.signInForm = this.loginService.signInForm;
    this.signUpForm = this.loginService.signUpForm;
  }

  //#region Input validation check and processing
  get userIDControlSignIn() { return this.loginService.userIDControlSignIn; }
  get passwordControlSignIn() { return this.loginService.passwordControlSignIn; }
  get emailControlSignUp() { return this.loginService.emailControlSignUp; }
  get userIDControlSignUp() { return this.loginService.userIDControlSignUp; }
  get passwordControlSignUp() { return this.loginService.passwordControlSignUp; }
  //#endregion

  /**
   * On init dialog
   */
  ngOnInit() {

  }

  signIn() {
    if (!this.signInForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));

      return;
    }

    this.commonApiService.put<UserModel>('login', {}).subscribe(data => {

    })
  }

  signUp() {

  }
}
