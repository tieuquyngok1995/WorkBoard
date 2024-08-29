import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  navigateWithParams(url: string, params: any): void {
    this.router.navigate([url], { queryParams: params });
  }
}