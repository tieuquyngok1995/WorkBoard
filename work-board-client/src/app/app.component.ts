import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'work-board-client';

  /**
   * Initialize and set base values
   */
  constructor(private authService: AuthService) {

  }

  public get isAuthenticated(): boolean {
    return this.authService.auth.isAuthenticated;
  }
}
