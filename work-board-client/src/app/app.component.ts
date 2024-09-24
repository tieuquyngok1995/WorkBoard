import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isLoading = false;

  /**
   * Initialize and s
   */
  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone) {

  }
  ngOnInit() {
    this.loadingService.loading$.subscribe(result => {
      this.ngZone.run(() => {
        this.isLoading = result;
        this.changeDetectorRef.detectChanges();
      });
    });
  }
  public get isAuthenticated(): boolean {
    return this.authService.auth.isAuthenticated;
  }
}
