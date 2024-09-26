import { NgControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { MESSAGES } from '../../core/constants/messages.constants';

@Directive({
  selector: '[appInputValidation]'
})
export class InputValidationDirective {
  // Create app input
  @Input() appInputValidation: string | undefined;
  // Create element html
  private errorDivElement: HTMLElement | null = null;
  private errorLabelElement: HTMLElement | null = null;
  private width: string = '36%';

  @HostListener('input') onInputChange() {
    this.checkValidity(this.control.control);
  }

  @HostListener('focus') onFocus() {
    this.renderer.addClass(this.el.nativeElement, 'focused');
  }

  @HostListener('blur') onBlur() {
    this.renderer.removeClass(this.el.nativeElement, 'focused');
    this.checkValidity(this.control.control);
  }

  @HostListener('dateChange', ['$event'])
  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;
    this.checkValidityDatepicker(selectedDate);
  }

  /**
   * A constructor initializes a class's objects upon creation.
   * @param el 
   * @param renderer 
   * @param control 
   */
  constructor(private el: ElementRef, private renderer: Renderer2, private control: NgControl) { }

  /**
   * Check the validity.
   */
  private checkValidity(control: any) {
    // Clear error message
    this.removeErrorMessage();

    if (control) {
      // remove class css
      this.renderer.removeClass(this.el.nativeElement, 'input-validate');
      // check validate FormControl
      if (control.invalid && (control.dirty || control.touched)) {
        const errorMessage = this.getErrorMessage(control.errors);
        this.showErrorMessage(errorMessage ?? '');

        // add class css
        this.renderer.addClass(this.el.nativeElement, 'input-validate');
      }
    }
  }

  /**
   * Check the validity of the date picker.
   */
  private checkValidityDatepicker(value: any) {
    // Clear error message
    this.removeErrorMessage();

    if (this.control) {
      // remove class css
      this.renderer.removeClass(this.el.nativeElement, 'input-validate');
      // check validate FormControl
      if (this.control.invalid && (this.control.dirty || this.control.touched)) {
        const errorMessage = this.getErrorMessage(this.control.errors);
        this.showErrorMessage(errorMessage ?? '');

        // add class css
        this.renderer.addClass(this.el.nativeElement, 'input-validate');
      }
      // Add date with utc
      const utcDate = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
      this.control.control?.setValue(utcDate);
    }
  }

  /**
   * Get error message
   * @param errors 
   * @returns 
   */
  private getErrorMessage(errors: any): string | undefined {
    if (!errors) return;

    // Handel create message
    this.width = '36%'
    if (errors.required) {
      this.width = '30%'
      return MESSAGES.E004;
    }
    else if (errors.maxlength || errors.max) {
      return MESSAGES.E005;
    }
    else if (errors.email) {
      return MESSAGES.E006;
    }
    else if (errors.pattern) {
      return MESSAGES.E007;
    }
    this.width = '30%'
    return MESSAGES.E008;
  }

  /**
   * Show error message
   * @param message 
   */
  private showErrorMessage(message: string) {
    // Create div error
    this.errorDivElement = this.renderer.createElement('div');
    this.renderer.addClass(this.errorDivElement, 'error');
    // Create label show error message
    this.errorLabelElement = this.renderer.createElement('label');
    this.renderer.addClass(this.errorLabelElement, 'error-message');
    // Set text to label
    const text = this.renderer.createText(message);
    this.renderer.appendChild(this.errorLabelElement, text);
    // Adjust width based on message content.
    if (text.length <= 23) {
      this.renderer.setStyle(this.errorDivElement, 'width', this.width);
    }
    // Add html to page
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.errorDivElement);
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.errorLabelElement);
  }

  /**
   * Clear error message
   */
  private removeErrorMessage() {
    if (this.errorDivElement) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.errorDivElement);
      this.errorDivElement = null;
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.errorLabelElement);
      this.errorLabelElement = null;
    }
  }
}
