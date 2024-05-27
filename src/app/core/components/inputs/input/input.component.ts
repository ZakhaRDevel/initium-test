import { booleanAttribute, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { FormInput } from '../../../abstract/form-input.abstract';
import { FormControlComponent } from '../form-control/form-control.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class InputComponent extends FormInput implements OnInit, OnDestroy {
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
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value: string) => {
      this.checkInputValue();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
