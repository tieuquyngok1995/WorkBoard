import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserModel } from '../../core/model/model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _signInForm!: FormGroup;
  private _signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  get signInForm(): FormGroup { return this._signInForm = this.createFormGroupSignIn() }
  get signInFormGetValue() { return this._signInForm.value }
  get userNameSignIn() { return this._signInForm.get('userName') }
  get passwordSignIn() { return this._signInForm.get('password') }

  get signUpForm(): FormGroup { return this._signUpForm = this.createFormGroupSignUp() }
  get signUpFormGetValue() { return this.signUpForm.value }
  get emailSignUp() { return this._signUpForm.get('email') }
  get userNameSignUp() { return this._signUpForm.get('userName') }
  get passwordSignUp() { return this._signUpForm.get('password') }

  /**
   * Reset form
   * @param form 
   */
  public resetFormSignIn(): void { this._signInForm.reset }
  public resetFormSignUp(): void { this._signUpForm.reset }

  /**
   * Initialize Form
   * @param task 
   * @returns Form
   */
  private createFormGroupSignIn(user?: UserModel): FormGroup {
    return this.fb.group({
      userName: [user?.userName || null, Validators.required],
      password: [user?.password || null, Validators.required]
    });
  }
  private createFormGroupSignUp(user?: UserModel): FormGroup {
    return this.fb.group({
      email: [user?.email || null, [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]],
      userName: [user?.userName || null, Validators.required],
      password: [user?.password || null, Validators.required]
    });
  }

}