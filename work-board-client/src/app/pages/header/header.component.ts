import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { DataListOption, SearchModel } from '../../core/model/model';
import { HeaderService } from './header.service';
import { DataService } from 'src/app/shared/service/data.service';
import { Search } from 'src/app/core/enum/enums';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public readonly SearchMode = Search;
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
    this.selectedKeyOption = -1;
    this.dataListFilter = this.createDataListFilter()
  }

  /**
   * On init dialog.
   */
  public ngOnInit(): void {
    // Event check change value input search
    this.searchControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
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

      if (this.selectedKeyOption === Search.DATE_DELIVERY) {
        this.dataService.sendData({
          searchMode: this.selectedKeyOption,
          searchDateStart: this.headerService.dateStart?.value,
          searchDateEnd: this.headerService.dateEnd?.value
        });
      }
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
      { key: Search.MODULE_ID, value: 'Module ID' },
      { key: Search.TASK_NAME, value: 'Task Name' },
      { key: Search.DATE_DELIVERY, value: 'Date Delivery' },
    ]
  }
}