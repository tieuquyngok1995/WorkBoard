import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventInput]'
})
export class PreventInputDirective {
  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // Cho phép phím "Delete" (key code 46) hoạt động bình thường
    if (event.key !== 'Delete' && event.key != 'Backspace') {
      event.preventDefault();
    }
  }
}