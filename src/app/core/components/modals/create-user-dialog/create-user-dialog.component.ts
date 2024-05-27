import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalLayoutComponent } from '../modal-layout/modal-layout.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Form } from '../../../abstract/form.abstract';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { InputComponent } from '../../inputs/input/input.component';
import { RecordService } from '../../../services/record.service';
import { phoneValidator } from '../../../validators/phone.validator';

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  imports: [CommonModule, ModalLayoutComponent, ReactiveFormsModule, InputComponent],
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent extends Form {
  private dialogRef = inject(MatDialogRef<CreateUserDialogComponent>);
  private fb = inject(FormBuilder);
  formGroup: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.min(2)]],
    surname: [null, [Validators.required, Validators.min(2)]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [phoneValidator()]]
  });
  private recordService = inject(RecordService);

  onConfirm(): void {
    this.submit();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  prepareRequest(): Observable<any> {
    const data = this.formGroup.getRawValue();
    return this.recordService.addRecord(data);
  }

  override onRequestSuccess(value: any) {
    super.onRequestSuccess(value);
    this.dialogRef.close(value);
  }
}
