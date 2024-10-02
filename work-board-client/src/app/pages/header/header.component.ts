import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { DataListOption } from 'src/app/core/model/model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public searchControl: FormControl;

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
  constructor(private authService: AuthService) {
    this.searchControl = new FormControl('');

    this.isInputOpen = false;
    this.isShowItem = false;
    this.userName = '';
    this.selectedOption = 'Search by';
    this.selectedKeyOption = 0;
    this.dataListFilter = [
      { key: 1, value: 'Module ID' },
      { key: 2, value: 'Task Name' },
      { key: 3, value: 'Date Delivey' },
    ]
  }
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();

  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(this.year, this.month, 13)),
    end: new FormControl(new Date(this.year, this.month, 16)),
  });
  readonly campaignTwo = new FormGroup({
    start: new FormControl(new Date(this.year, this.month, 15)),
    end: new FormControl(new Date(this.year, this.month, 19)),
  });
  /**
   * On init dialog.
   */
  ngOnInit(): void {
    this.userName = this.authService.userName;
  }

  /**
   * Get value select option.
   * @param option 
   */
  selectOption(option?: DataListOption) {
    if (option) {
      this.selectedKeyOption = option.key;
      this.selectedOption = option.value;
    } else {
      this.selectedKeyOption = 0;
      this.selectedOption = 'All';
    }
    this.searchControl.setValue('');
  }

  /**
   * Open search bar.
   */
  openSearch() {
    this.isInputOpen = true;
    setTimeout(() => {
      this.isShowItem = true
    }, 500);
  }

  /**
   * Close search bar.
   */
  closeSearch() {
    this.isInputOpen = false;
    this.isShowItem = false
  }

  /**
   * Event log out.
   */
  logOut(): void {
    this.authService.logOut();
  }


  /**
   * Filter date, allows to select days from Monday to Friday.
   * @param d date input
   * @returns boolean filter date
   */
  public dateFilter(d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
}