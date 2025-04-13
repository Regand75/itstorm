import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NameValidatorDirective} from "./directives/name-validator.directive";


@NgModule({
  declarations: [NameValidatorDirective],
  imports: [
    CommonModule
  ],
  exports: [NameValidatorDirective],
})
export class SharedModule { }
