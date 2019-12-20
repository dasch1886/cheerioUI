import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
@NgModule({
  declarations: [NavbarComponent, SpinnerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    SpinnerComponent,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
