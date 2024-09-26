import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventInput]'
})
export class PreventInputDirective {

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Delete' && event.key != 'Backspace') {
      event.preventDefault();
    }
  }

}