
import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { Search } from '../../core/enum/enums';
import { AuthService } from '../../core/services/auth.service';
import { DialogConfig } from '../../config/dialog-config.model';
import { DataService } from '../../shared/service/data.service';
import { DownloadService } from '../../core/services/download.service';
import { NavigationService } from '../../core/services/navigation.service';
import { DataListOption, HeaderModel } from '../../core/model/model';

import { HeaderService } from './header.service';
import { UserComponent } from '../setting/user/user.component';
import { EmailDialogComponent } from '../setting/email-dialog/email-dialog.component';
import { SettingTemplateWbsComponent } from '../setting/setting-template-wbs/setting-template-wbs.component';

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

  public isAdmin!: boolean;
  public numNotification: number;

  public selectedOption: string;
  public selectedKeyOption: number;
  public dataListFilter: DataListOption[];

  /**
   * A constructor initializes a class's objects upon creation.
   */
  constructor(
    private readonly dialog: Dialog,
    private readonly authService: AuthService,
    private readonly dataService: DataService,
    private readonly headerService: HeaderService,
    private readonly downloadService: DownloadService,
    private readonly navigationService: NavigationService) {

    this.searchControl = new FormControl('');
    this.datePickerForm = headerService.datePickerForm;

    this.isInputOpen = false;
    this.isShowItem = false;
    this.userName = '';
    this.selectedOption = 'Search by';
    this.numNotification = 0;
    this.selectedKeyOption = -1;
    this.dataListFilter = this.createDataListFilter()
  }

  /**
   * On init header.
   */
  public ngOnInit(): void {
    this.isAdmin = this.authService.roleID !== 2;
    this.headerService.connectWebSocket(this.authService.userID);

    // Event check change value input search
    this.searchControl.valueChanges.pipe(debounceTime(250), distinctUntilChanged()).subscribe(value => {
      if (value === null) return;

      if (value === '') {
        this.dataService.sendData(null);
      } else {
        this.dataService.sendData({ searchMode: this.selectedKeyOption, searchValue: value.toUpperCase() });
      }
    });

    this.headerService.getNotification().subscribe(data => {
      if (data) this.numNotification++;
      this.dataService.sendData({ message: data.toString() });
    });

    this.dataService.currentData.subscribe(data => {
      if (data === null) this.numNotification = 0;
    });

    // Event check change value date picker end
    this.headerService.dateEnd?.valueChanges.subscribe(value => {
      if (!value) return;

      const dataToSend: HeaderModel = {
        searchMode: this.selectedKeyOption,
        searchDateStart: this.headerService.dateStart?.value,
        searchDateEnd: value
      }
      this.dataService.sendData(dataToSend);
    });

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
      this.searchControl.enable();
    }
    this.searchControl.setValue(null);
  }

  /**
   * Open search bar.
   */
  public openSearch(): void {
    this.isInputOpen = true;
    setTimeout(() => {
      this.isShowItem = true
      this.searchControl.disable();
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
   * Event clear all noti in screen.
   */
  public clearNoti() {
    this.numNotification = 0;
    this.dataService.sendData({ message: null });
  }

  /**
   * Open Document
   */
  public openDocument() {
    this.navigationService.navigateTo('document');
  }

  /**
   * Open task calendar
   */
  public openTaskCalendar() {
    this.navigationService.navigateTo('calendar');
  }

  /**
   * Open dialog setting user
   */
  public openSendMail() {
    this.dialog.open(EmailDialogComponent, {
      disableClose: true,
      minWidth: DialogConfig.DEFAULT_WIDTH,
    });
  }

  /**
   * Open dialog setting user
   */
  public openSettingUser() {
    this.dialog.open(UserComponent, {
      disableClose: true,
      minWidth: DialogConfig.DEFAULT_MAX_WIDTH,
    });
  }

  /**
   * Excel file download processing.
   */
  public dowloadFileWBS(): void {
    this.downloadService.downloadExcel();
  }

  /**
   * Open dialog setting template WBS.
   */
  public settingTemplateWBS(): void {
    this.dialog.open(SettingTemplateWbsComponent, {
      disableClose: true,
      minWidth: DialogConfig.DEFAULT_WIDTH,
    });
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
      { key: Search.TASK_ASSIGNEE, value: 'Task Assignee' },
      { key: Search.DATE_DELIVERY, value: 'Date Delivery' },
    ]
  }
}