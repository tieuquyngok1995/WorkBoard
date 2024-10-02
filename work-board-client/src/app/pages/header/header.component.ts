import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { DataListOption, SearchModel } from '../../core/model/model';
import { HeaderService } from './header.service';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public searchControl: FormControl;
  public datePickerForm: FormGroup;

  public isInputOpen: boolean;
  public isShowItem: boolean;
  public userName: string;
  public selectedOption: string;
  public selectedKeyOption: number;
  public dataListFilter: DataListOption[];

  /**
   * A constructor initializes a class's objects upon creation.
   * @param authService 
   */
  constructor(private headerService: HeaderService, private authService: AuthService, private dataService: DataService) {
    this.searchControl = new FormControl('');
    this.datePickerForm = headerService.datePickerForm;

    this.isInputOpen = false;
    this.isShowItem = false;
    this.userName = '';
    this.selectedOption = 'Search by';
    this.selectedKeyOption = 0;
    this.dataListFilter = this.createDataListFilter()
  }

  /**
   * On init dialog.
   */
  public ngOnInit(): void {
    // Event check change value input search
    this.searchControl.valueChanges.subscribe(value => {
      if (!value) return;

      this.dataService.sendData({ searchMode: this.selectedKeyOption, searchValue: value });
    });

    // Event check change value date picker end
    this.headerService.dateEnd?.valueChanges.subscribe(value => {
      if (!value) return;

      const dataToSend: SearchModel = {
        searchMode: this.selectedKeyOption,
        searchDateStart: this.headerService.dateStart?.value,
        searchDateEnd: value
      }
      this.dataService.sendData(dataToSend);
    })

    // Set user name login in
    this.userName = this.authService.userName;
  }

  /**
   * Get value select option.
   * @param option 
   */
  public selectOption(option?: DataListOption): void {
    if (option) {
      this.selectedKeyOption = option.key;
      this.selectedOption = option.value;

      if (this.selectedKeyOption === 3) {
        this.dataService.sendData({
          searchMode: this.selectedKeyOption,
          searchDateStart: this.headerService.dateStart?.value,
          searchDateEnd: this.headerService.dateEnd?.value
        });
      }
    } else {
      this.selectedKeyOption = 0;
      this.selectedOption = 'All';
      this.dataService.sendData({ searchMode: this.selectedKeyOption });
    }
    this.searchControl.setValue('');
  }

  /**
   * Open search bar.
   */
  public openSearch(): void {
    this.isInputOpen = true;
    setTimeout(() => {
      this.isShowItem = true
    }, 500);
  }

  /**
   * Close search bar.
   */
  public closeSearch(): void {
    this.isInputOpen = false;
    this.isShowItem = false

    this.dataService.sendData(null);
  }

  /**
   * Event log out.
   */
  public logOut(): void {
    this.authService.logOut();
  }

  /**
   * Create data list filter.
   * @returns 
   */
  private createDataListFilter(): DataListOption[] {
    return [
      { key: 1, value: 'Module ID' },
      { key: 2, value: 'Task Name' },
      { key: 3, value: 'Date Delivey' },
    ]
  }
}