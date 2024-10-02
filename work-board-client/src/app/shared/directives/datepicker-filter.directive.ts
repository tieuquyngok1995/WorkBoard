import { Directive } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';

@Directive({
  selector: '[appDatepickerFilter]'
})
export class DatepickerFilterDirective {

  /**
   * A constructor initializes a class's objects upon creation.
   * @param datepickerInput 
   */
  constructor(private datepickerInput: MatDatepickerInput<Date>) {
    this.datepickerInput.dateFilter = this.defaultDateFilter;
  }

  /**
   * Filter date not satuday and sunday
   * @param d 
   * @returns 
   */
  defaultDateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
}
