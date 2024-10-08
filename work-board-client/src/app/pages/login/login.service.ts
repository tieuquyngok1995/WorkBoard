import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../core/model/model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _signInForm!: FormGroup;
  private _signUpForm!: FormGroup;

  /**
   * A constructor initializes a class's objects upon creation.
   * @param fb Form Builder
   */
  constructor(private fb: FormBuilder) { }

  // Get form
  get signInForm(): FormGroup { return this._signInForm = this.createFormGroupSignIn() }
  get signUpForm(): FormGroup { return this._signUpForm = this.createFormGroupSignUp() }

  /**
   * Reset form.
   * @param form 
   */
  public resetFormSignIn(): void { this._signInForm.reset }
  public resetFormSignUp(): void { this._signUpForm.reset }

  /**
   * Initialize Form.
   * @param task 
   * @returns Form
   */
  private createFormGroupSignIn(user?: UserModel): FormGroup {
    return this.fb.group({
      userName: [user?.userName || '', Validators.required],
      password: [user?.password || '', Validators.required]
    });
  }
  private createFormGroupSignUp(user?: UserModel): FormGroup {
    return this.fb.group({
      email: [user?.email || '', [Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]],
      userName: [user?.userName || '', Validators.required],
      password: [user?.password || '', Validators.required]
    });
  }
}