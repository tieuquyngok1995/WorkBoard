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

  ngOnInit(): void {
    this.userName = this.authService.userName
  }

  logOut(): void {
    this.authService.logOut();
  }
}