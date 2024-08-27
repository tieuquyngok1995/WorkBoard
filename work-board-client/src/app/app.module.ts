import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DialogModule } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { DialogAddTaskComponent } from './pages/dialog-add-task/dialog-add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    DialogAddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DialogModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
