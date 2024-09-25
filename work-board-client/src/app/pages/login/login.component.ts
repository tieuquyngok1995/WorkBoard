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
   * Initialize and set base values.
   * @param authService 
   * @param loginService 
   * @param messageService 
   * @param navigationService 
   * @param confirmDialogService 
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

  /**
   * On init dialog.
   */
  ngOnInit() {
    // Reset form
    this.loginService.resetFormSignIn();
    this.loginService.resetFormSignUp();
  }

  /**
   * Event sing in.
   * @returns 
   */
  signIn() {
    if (!this.signInForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));
      return;
    }

    const model: UserModel = this.signInForm.value;
    this.authService.signIn(model).subscribe(result => {
      if (result) {
        this.navigationService.navigateTo('/');
      } else {
        this.confirmDialogService.openDialog(this.messageService.getMessage('E001'));
      }
    });
  }

  /**
   * Event sing up.
   * @returns 
   */
  signUp() {
    if (!this.signUpForm.valid) {
      this.confirmDialogService.openDialog(this.messageService.getMessage('A001'));
      return;
    }

    const model: UserModel = this.signUpForm.value;
    this.authService.signUp(model).subscribe(result => {
      if (result) {
        this.navigationService.navigateTo('/');
      } else {
        this.confirmDialogService.openDialog(this.messageService.getMessage('E002'));
      }
    });
  }
}