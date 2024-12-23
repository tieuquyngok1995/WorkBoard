import { Directive, ElementRef, Host, HostListener } from "@angular/core";
import { AbstractControl, FormGroup, FormGroupDirective } from "@angular/forms";

@Directive({
  selector: '[appResetInputForm]'
})
export class ResetInputFormDirective {
  private detachClass: string = 'input-validate';

  constructor(@Host() private formGroupDirective: FormGroupDirective, private el: ElementRef) { }

  // Listen enven reset
  @HostListener('reset')
  onFormReset() {
    const formGroup = this.formGroupDirective.control;
    this.resetControlsAndClasses(formGroup);
  }

  /**
   * Clear and set value to control in form
   * @param control 
   */
  private resetControlsAndClasses(control: AbstractControl) {
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach((controlName) => {
        const childControl = control.controls[controlName];
        this.resetControlsAndClasses(childControl);

        // Find tag input
        const inputElement = this.getInputElement(controlName);
        if (inputElement && this.detachClass) {
          inputElement.classList.remove(this.detachClass);
        }

        // Set value
        childControl.setValue(null, { emitEvent: false });
      });
    }
  }

  /**
   * Get input element
   */
  private getInputElement(controlName: string): HTMLElement | null {
    const formElement = this.el.nativeElement as HTMLElement;
    return formElement.querySelector(`[formControlName="${controlName}"]`);
  }
}