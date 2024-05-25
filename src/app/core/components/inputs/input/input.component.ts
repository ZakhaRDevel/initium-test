import { booleanAttribute, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
export class InputComponent extends FormInput implements OnInit {
  @Input() withError: boolean = false;
  @Input() showError: boolean = true;
  @Input() label: string = '';
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input() control: UntypedFormControl | any = new UntypedFormControl();
  @Input({ transform: booleanAttribute }) readonly: boolean = false;
  @Input() type: string = 'text';
  @ViewChild('input') input: ElementRef;

  inputFocus: boolean = false;
  inputFilled: boolean = false;

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value: string) => {
      this.checkInputValue();
    });
  }

  checkInputValue(): void {
    this.inputFilled = !!this.control.value && !this.inputFocus;
  }

  onFocus(): void {
    this.inputFocus = true;
    this.checkInputValue();
  }

  onBlur(): void {
    this.inputFocus = false;
    this.checkInputValue();
  }
}
