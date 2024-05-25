import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from '../form-control/form-control.component';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-input-checkbox',
  standalone: true,
  imports: [CommonModule, FormControlComponent, ReactiveFormsModule],
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss']
})
export class InputCheckboxComponent {
  @Input() withError: boolean = false;
  @Input() showError: boolean = true;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input() control: UntypedFormControl | any = new UntypedFormControl();
  @Input() state: 'unchecked' | 'checked' | 'indeterminate' = 'unchecked';
  @Output() stateChange = new EventEmitter<'unchecked' | 'checked' | 'indeterminate'>();

  toggleState() {
    if (this.state === 'unchecked') {
      this.state = 'checked';
    } else if (this.state === 'checked') {
      this.state = 'unchecked';
    }
    this.stateChange.emit(this.state);
  }

  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.toggleState();
  }
}