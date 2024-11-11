import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './core/services/auth-guard.service';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { TaskCalendarComponent } from './pages/task-calendar/task-calendar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'calendar', component: TaskCalendarComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuardService], pathMatch: 'full' },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
