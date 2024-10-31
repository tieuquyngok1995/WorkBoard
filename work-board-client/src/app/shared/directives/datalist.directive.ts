import { NgControl } from '@angular/forms';
import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { DataListOption } from '../../core/model/model';

@Directive({
  selector: '[appDataList]'
})
export class DataListDirective implements OnInit, AfterViewInit {
  // Set data list option
  @Input('optionList') optionList: DataListOption[] | undefined;

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    // Get the key of the option based on the value.
    this.getKeyOption(event);
  }

  /**
   * A constructor initializes a class's objects upon creation.
   * @param el 
   * @param ngControl 
   */
  constructor(private el: ElementRef, private ngControl: NgControl) { }

  /**
   * On page initialization.
   */
  ngOnInit() {
    this.updateValueFromKey();
  }

  /**
   * Fired after the view and child views of the component have been initialized.
   */
  ngAfterViewInit() {
    if (this.optionList) {
      this.createOption();
    }
  }

  /**
   * Check change drop downd and update
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['optionList']) {
      this.createOption();
    }
  }

  /**
   * Create Option.
   */
  private createOption() {
    const inputElement = this.el.nativeElement;
    const dataListId = inputElement.id + 'Option';

    // Create new element datalist
    const dataList = document.createElement('datalist');
    dataList.id = dataListId;

    if (this.optionList) {
      // Set key to data key option
      this.optionList.forEach(item => {
        const option = document.createElement('option');
        option.value = item.value;
        option.setAttribute('data-key', item.key.toString());
        dataList.appendChild(option);
      });

      // Add html to page
      inputElement.parentNode?.insertBefore(dataList, inputElement.nextSibling);
      inputElement.setAttribute('list', dataListId);
    }
  }

  /**
   * Get the key of the option based on the value.
   * @param event 
   */
  private getKeyOption(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const optionList = document.getElementById(inputElement.id + 'Option');

    if (optionList) {
      const options = Array.from(optionList.getElementsByTagName('option')) as HTMLOptionElement[];

      // Find option by value
      const selectedOption = options.find(option => option.value === inputElement.value);
      if (selectedOption && this.ngControl.control) {
        const key = selectedOption.getAttribute('data-key') || '';
        this.ngControl.control.setValue(Number(key));
        inputElement.value = selectedOption.value;
      }
    }
  }

  /**
   * Update the value of the option based on the key.
   */
  private updateValueFromKey() {
    const key = this.ngControl.control?.value;
    const selectedItem = this.optionList?.find(item => item.key === key);
    if (selectedItem) {
      const inputElement = this.el.nativeElement as HTMLInputElement;
      inputElement.value = selectedItem.value;
    }
  }
}