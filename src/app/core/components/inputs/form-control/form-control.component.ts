import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FormInput } from '../../../abstract/form-input.abstract';
import { NgIf } from '@angular/common';
import { ErrorReplacePipe } from '../../../pipes/error-replace.pipe';
import { fadeInEnter } from '../../../animations/fade-in-enter.animation';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  imports: [
    NgIf,
    ErrorReplacePipe
  ],
  standalone: true,
  animations: [fadeInEnter('0.3s')]
})
export class FormControlComponent extends FormInput {
  @Input() withError: boolean = false;
  @Input() control: UntypedFormControl = new UntypedFormControl();
  @Input() showErrors: boolean = true;
}
