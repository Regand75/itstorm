import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NameValidatorDirective} from "./directives/name-validator.directive";
import {ServiceCardComponent} from './components/service-card/service-card.component';
import {RouterModule} from "@angular/router";
import {AdvantageComponent} from './components/advantage/advantage.component';
import {LoaderComponent} from './components/loader/loader.component';
import {PopupComponent} from './components/popup/popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";


@NgModule({
  declarations: [NameValidatorDirective, ServiceCardComponent, AdvantageComponent, LoaderComponent, PopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [NameValidatorDirective, ServiceCardComponent, AdvantageComponent, LoaderComponent, PopupComponent],
})
export class SharedModule {
}
