import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NameValidatorDirective} from "./directives/name-validator.directive";
import { ServiceCardComponent } from './components/service-card/service-card.component';
import {RouterModule} from "@angular/router";
import { AdvantageComponent } from './components/advantage/advantage.component';


@NgModule({
  declarations: [NameValidatorDirective, ServiceCardComponent, AdvantageComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
    exports: [NameValidatorDirective, ServiceCardComponent, AdvantageComponent],
})
export class SharedModule { }
