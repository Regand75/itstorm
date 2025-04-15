import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NameValidatorDirective} from "./directives/name-validator.directive";
import { ServiceCardComponent } from './components/service-card/service-card.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [NameValidatorDirective, ServiceCardComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
    exports: [NameValidatorDirective, ServiceCardComponent],
})
export class SharedModule { }
