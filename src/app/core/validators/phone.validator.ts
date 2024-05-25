import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const validPhonePattern = /^\+7\d{10}$/;
    const valid = validPhonePattern.test(value);
    return valid ? null : { invalidPhone: true };
  };
}
