import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { UserModel } from '../../core/model/model';
import { AuthService } from '../../core/services/auth.service';
import { MessageService } from '../../shared/service/message.service';
import { NavigationService } from '../../core/services/navigation.service';
import { DialogMessageService } from '../../shared/service/dialog-message.service';

import { LoginService } from './login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public signInForm: FormGroup;
  public signUpForm: FormGroup;

  /**
   * A constructor initializes a class's objects upon creation.
   */
  constructor(
    private readonly authService: AuthService,
    private readonly loginService: LoginService,
    private readonly messageService: MessageService,
    private readonly navigationService: NavigationService,
    private readonly confirmDialogService: DialogMessageService) {

    this.signInForm = this.loginService.signInForm;
    this.signUpForm = this.loginService.signUpForm;
  }

  /**
   * On init dialog.
   */
  public ngOnInit(): void {
    // Reset form
    this.loginService.resetFormSignIn();
    this.loginService.resetFormSignUp();
  }

  /**
   * Event sing in.
   * @returns 
   */
  public signIn(): void {
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
    }, () => {
      this.confirmDialogService.openDialog(this.messageService.getMessage('E001'));
    });
  }

  /**
   * Event sing up.
   * @returns 
   */
  public signUp(): void {
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
    }, () => {
      this.confirmDialogService.openDialog(this.messageService.getMessage('E002'));
    });
  }
}