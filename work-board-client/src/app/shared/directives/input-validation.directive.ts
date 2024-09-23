import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MESSAGES } from 'src/app/core/constants/messages.constants';

@Directive({
  selector: '[appInputValidation]'
})
export class InputValidationDirective {
  @Input() appInputValidation: string | undefined;

  private errorDivElement: HTMLElement | null = null;
  private errorLabelElement: HTMLElement | null = null;
  private width: string = '36%';

  constructor(private el: ElementRef, private renderer: Renderer2, private control: NgControl) { }

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
    this.checkValidity(selectedDate);
  }

  private checkValidity(control: any) {
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

  private getErrorMessage(errors: any): string | undefined {
    if (!errors) return;

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

  private showErrorMessage(message: string) {
    // Tạo thẻ nhỏ để hiển thị thông điệp lỗi
    this.errorDivElement = this.renderer.createElement('div');
    this.renderer.addClass(this.errorDivElement, 'error');

    this.errorLabelElement = this.renderer.createElement('label');
    this.renderer.addClass(this.errorLabelElement, 'error-message');

    const text = this.renderer.createText(message);
    this.renderer.appendChild(this.errorLabelElement, text);

    if (text.length <= 23) {
      this.renderer.setStyle(this.errorDivElement, 'width', this.width);
    }

    this.renderer.appendChild(this.el.nativeElement.parentNode, this.errorDivElement);
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.errorLabelElement);
  }

  private removeErrorMessage() {
    if (this.errorDivElement) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.errorDivElement);
      this.errorDivElement = null;
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.errorLabelElement);
      this.errorLabelElement = null;
    }
  }
}
