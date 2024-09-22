import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter, MaterialModule } from './app-material.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoadingInterceptor } from './core/interceptor/loading.interceptor';
import { SharedModule } from './shared/module/shared.module';
import { ConfirmDialogComponent } from './shared/dialog-message/dialog-message.component';

import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { TaskComponent } from './pages/task/task.component';
import { TaskProgressComponent } from './pages/task-progress/task-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    TaskComponent,
    TaskProgressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    DragDropModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
