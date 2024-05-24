/* eslint-disable */
import { booleanAttribute, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { FormInput } from '../../../abstract/form-input.abstract';
import { FormControlComponent } from '../form-control/form-control.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormControlComponent
  ],
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends FormInput {
  @Input() withError: boolean = false;
  @Input() showError: boolean = true;
  @Input() label: string = '';
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input() control: UntypedFormControl | any = new UntypedFormControl();
  @Input({ transform: booleanAttribute }) readonly: boolean = false;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() id: string = '';

  @ViewChild('input') input: ElementRef | undefined;
  @Output() changeEvent = new EventEmitter();

  onChange() {
    this.changeEvent.emit();
  }
}
