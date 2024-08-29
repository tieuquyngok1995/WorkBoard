import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LoginService } from './login.service';
import { MessageService } from '../../shared/service/message.service';

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
    private messageService: MessageService) {
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
}
