import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[NameValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: NameValidatorDirective, multi: true}],
})
export class NameValidatorDirective implements Validator{

  private nameRegex = /^([А-ЯЁ][а-яё]+)(\s[А-ЯЁ][а-яё]+)*$/;

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    return this.nameRegex.test(value) ? null : { invalidName: true };
  }
}
