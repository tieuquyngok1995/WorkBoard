import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userName!: string;

  constructor(private authService: AuthService) { }

  /**
   * On init dialog.
   */
  ngOnInit(): void {
    this.userName = this.authService.userName
  }

  /**
   * Event log out.
   */
  logOut(): void {
    this.authService.logOut();
  }
}