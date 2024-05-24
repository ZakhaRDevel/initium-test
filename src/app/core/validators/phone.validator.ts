import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validPhonePattern = /^\+7\d{10}$/;
    const valid = validPhonePattern.test(control.value);
    return valid ? null : { invalidPhone: true };
  };
}
