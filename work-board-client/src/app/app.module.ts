import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { DialogModule } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FullCalendarModule } from '@fullcalendar/angular';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomDateAdapter, MaterialModule } from './app-material.module';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HandleApiInterceptor } from './core/interceptor/handle-api.interceptor';

import { SharedModule } from './shared/module/shared.module';
import { DataListDirective } from './shared/directives/datalist.directive';
import { InputDirective } from './shared/directives/input-validation.directive';
import { ResetInputFormDirective } from './shared/directives/reset-input-form.directive';
import { ConfirmDialogComponent } from './shared/dialog-message/dialog-message.component';
import { DatepickerFilterDirective } from './shared/directives/datepicker-filter.directive';

import { HomeComponent } from './pages/home/home.component';
import { TaskComponent } from './pages/task/task.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { HeaderComponent } from './pages/header/header.component';
import { UserComponent } from './pages/setting/user/user.component';
import { DocumentComponent } from './pages/document/document.component';
import { TaskProgressComponent } from './pages/task-progress/task-progress.component';
import { TaskCalendarComponent } from './pages/task-calendar/task-calendar.component';
import { UserDialogComponent } from './pages/setting/user-dialog/user-dialog.component';
import { EmailDialogComponent } from './pages/setting/email-dialog/email-dialog.component';
import { SettingTemplateWbsComponent } from './pages/setting/setting-template-wbs/setting-template-wbs.component';

const API_URL = 'https://localhost:7047/api/';

@NgModule({
  declarations: [
    AppComponent,
    InputDirective,
    DataListDirective,
    ConfirmDialogComponent,
    ResetInputFormDirective,
    DatepickerFilterDirective,

    HeaderComponent,
    HomeComponent,
    TaskComponent,
    TaskProgressComponent,
    TaskCalendarComponent,
    DocumentComponent,

    LoginComponent,
    UserComponent,
    UserDialogComponent,

    EmailDialogComponent,
    SettingTemplateWbsComponent,

    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    DialogModule,
    SharedModule,
    DragDropModule,
    MaterialModule,
    MatInputModule,
    HttpClientModule,
    AppRoutingModule,
    FullCalendarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: 'API_URL', useValue: API_URL },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: HTTP_INTERCEPTORS, useClass: HandleApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
