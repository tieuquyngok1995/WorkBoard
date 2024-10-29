import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserModel } from '../../../core/model/model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private form!: FormGroup;

  /**
   * A constructor initializes a class's objects upon creation.
   * @param fb Form Builder
   */
  constructor(private fb: FormBuilder) { }

  // Get form
  get userForm(): FormGroup { return this.form = this.createFormGroup(); }

  get password() { return this.form.get('password') }

  /**
   * Update value to form.
   * @param user 
   */
  public updateForm(user: UserModel): void { this.form.patchValue(user) }

  /**
   * Reset form.
   * @param form 
   */
  public resetForm(): void { this.form.reset }

  /**
   * Initialize Form.
   * @param user 
   * @returns Form
   */
  private createFormGroup(user?: UserModel): FormGroup {
    return this.fb.group({
      userID: [user?.userID || null],
      email: [user?.email || null, [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]],
      userName: [user?.userName || null, Validators.required],
      password: [user?.password || null],
      roleID: [user?.roleID || null, Validators.required]
    });
  }
}