import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DataListOption } from 'src/app/core/model/model';

@Directive({
  selector: '[appDataList]'
})
export class DataListDirective {
  @Input('optionList') optionList: DataListOption[] | undefined;

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const dataList = document.getElementById(inputElement.id + 'Option');

    if (dataList) {
      const options = Array.from(dataList.getElementsByTagName('option')) as HTMLOptionElement[];

      // Tìm option phù hợp
      const selectedOption = options.find(option => option.value === inputElement.value);

      if (selectedOption && this.ngControl.control) {
        const key = selectedOption.getAttribute('data-key') || '';

        this.ngControl.control.setValue(Number(key));

        inputElement.value = selectedOption.value;
      }
    }
  }

  constructor(private el: ElementRef, private ngControl: NgControl) { }

  ngOnInit() {
    // Khi directive được khởi tạo, kiểm tra và hiển thị value từ key trong FormControl
    this.updateInputValueFromKey();
  }

  ngAfterViewInit() {
    if (this.optionList) {
      this.createDataList();
    }
  }

  createDataList() {
    const inputElement = this.el.nativeElement;
    const dataListId = inputElement.id + 'Option';

    // Tạo datalist mới
    const dataList = document.createElement('datalist');
    dataList.id = dataListId;

    if (this.optionList) {

      this.optionList.forEach(item => {
        const option = document.createElement('option');
        option.value = item.value;
        option.setAttribute('data-key', item.key.toString());
        dataList.appendChild(option);
      });

      inputElement.parentNode?.insertBefore(dataList, inputElement.nextSibling);
      inputElement.setAttribute('list', dataListId);
    }
  }

  private updateInputValueFromKey() {
    const key = this.ngControl.control?.value; // Lấy giá trị key từ FormControl
    if (this.optionList) {
      const selectedItem = this.optionList.find(item => item.key === key);
      if (selectedItem) {
        const inputElement = this.el.nativeElement as HTMLInputElement;
        inputElement.value = selectedItem.value; // Hiển thị value trong input
      }
    }
  }
}