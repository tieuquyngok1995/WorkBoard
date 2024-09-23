import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public loading = this.loadingService.loading$;

  /**
   * Initialize and s
   */
  constructor(
    private authService: AuthService,
    private loadingService: LoadingService) {

  }

  public get isAuthenticated(): boolean {
    return this.authService.auth.isAuthenticated;
  }
}
