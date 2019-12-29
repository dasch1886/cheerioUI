import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';
import { SearchFilterPipe } from './pipe/filter/search-filter.pipe';
import { ClickOutsideDirective } from './directive/click-outside/click-outside.directive';
@NgModule({
  declarations: [NavbarComponent, SpinnerComponent, AutocompleteInputComponent, SearchFilterPipe, ClickOutsideDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ClickOutsideDirective,
    SearchFilterPipe,
    AutocompleteInputComponent,
    NavbarComponent,
    SpinnerComponent,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
