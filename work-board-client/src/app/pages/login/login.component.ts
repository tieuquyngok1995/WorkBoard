import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UserModel } from '../../core/model/model';
import { AuthService } from '../../core/services/auth.service';
import { MessageService } from '../../shared/service/message.service';
import { CommonApiService } from '../../core/services/common-api.service';
import { NavigationService } from '../../core/services/navigation.service';
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
    private authService: AuthService,
    private loginService: LoginService,
    private messageService: MessageService,
    private navigationService: NavigationService,
    private confirmDialogService: DialogMessageService) {
    this.signInForm = this.loginService.signInForm;
    this.signUpForm = this.loginService.signUpForm;
  }

  //#region Input validation check and processing
  get userNameControlSignIn() { return this.loginService.userNameSignIn; }
  get passwordControlSignIn() { return this.loginService.passwordSignIn; }
  get emailControlSignUp() { return this.loginService.emailSignUp; }
  get userNameControlSignUp() { return this.loginService.userNameSignUp; }
  get passwordControlSignUp() { return this.loginService.passwordSignUp; }
  //#endregion

  /**
   * On init dialog
   */
  ngOnInit() {
    this.loginService.resetFormSignIn();
    this.loginService.resetFormSignUp();
  }

  signIn() {
    if (!this.signInForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));
      return;
    }

    const model: UserModel = this.loginService.signInFormGetValue;
    this.authService.signIn(model.userName, model.password).subscribe(result => {
      if (result) {
        this.navigationService.navigateTo('/');
      } else {
        this.confirmDialogService.openDialog(this.messageService.getMessage('E001'));
      }
    });
  }

  signUp() {
    if (!this.signUpForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));
      return;
    }

    const model: UserModel = this.loginService.signUpFormGetValue;
    model.token = '';
    this.authService.signUp(model).subscribe(result => {
      if (result) {
        this.navigationService.navigateTo('/');
      } else {
        this.confirmDialogService.openDialog(this.messageService.getMessage('E002'));
      }
    });
  }
}
