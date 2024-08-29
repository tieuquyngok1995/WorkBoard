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
  styleUrls: ['./login.component.css'],
  providers: [CommonApiService]
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
  get userNameControlSignIn() { return this.loginService.userNameControlSignIn; }
  get passwordControlSignIn() { return this.loginService.passwordControlSignIn; }
  get emailControlSignUp() { return this.loginService.emailControlSignUp; }
  get userNameControlSignUp() { return this.loginService.userNameControlSignUp; }
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

    const model: UserModel = this.loginService.signInFormGetValue;
    this.commonApiService.get<UserModel>('Login/GetLogin', { userName: model.userName, password: model.password }).subscribe(data => {
      if (data) {
        console.log(data);
      }
    })
  }

  signUp() {

  }
}
