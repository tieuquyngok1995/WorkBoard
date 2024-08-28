// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreventInputDirective } from '../directives/prevent-input.directive';

@NgModule({
  declarations: [
    PreventInputDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PreventInputDirective
  ]
})
export class SharedModule { }