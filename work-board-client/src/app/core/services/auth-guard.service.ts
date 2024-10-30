import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  /**
   * A constructor initializes a class's objects upon creation.
   * @param authService 
   * @param router 
   */
  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  /**
   * Check authenticated user
   * @returns 
   */
  canActivate(): boolean {
    if (this.authService.auth.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}