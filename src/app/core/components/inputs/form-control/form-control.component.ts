import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FormInput } from '../../../abstract/form-input.abstract';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  imports: [
    NgIf
  ],
  standalone: true
})
export class FormControlComponent extends FormInput {
  @Input() withError: boolean = false;
  @Input() control: UntypedFormControl = new UntypedFormControl();
  @Input() showErrors: boolean = true;
}
