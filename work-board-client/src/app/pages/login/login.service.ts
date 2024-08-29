import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserModel } from '../../core/model/model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _signInForm: FormGroup;
  private _signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this._signInForm = this.createFormGroupSignIn();
    this._signUpForm = this.createFormGroupSignUp();
  }

  private createFormGroupSignIn(user?: UserModel): FormGroup {
    return this.fb.group({
      userID: [user?.userID || null, Validators.required],
      password: [user?.password || null, Validators.required]
    });
  }

  private createFormGroupSignUp(user?: UserModel): FormGroup {
    return this.fb.group({
      email: [user?.email || null, [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]],
      userID: [user?.userID || null, Validators.required],
      password: [user?.password || null, Validators.required]
    });
  }

  get signInForm(): FormGroup { return this._signInForm }
  get signInFormGetValue(): FormGroup { return this._signInForm.value }
  get userIDControlSignIn() { return this._signInForm.get('userID') }
  get passwordControlSignIn() { return this._signInForm.get('password') }

  get signUpForm(): FormGroup { return this._signUpForm }
  get emailControlSignUp() { return this._signUpForm.get('email') }
  get userIDControlSignUp() { return this._signUpForm.get('userID') }
  get passwordControlSignUp() { return this._signUpForm.get('password') }
}