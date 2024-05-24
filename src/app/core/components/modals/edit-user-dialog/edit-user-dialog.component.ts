import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../inputs/input/input.component';
import { ModalLayoutComponent } from '../modal-layout/modal-layout.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecordService } from '../../../services/record.service';
import { phoneValidator } from '../../../validators/phone.validator';
import { Observable } from 'rxjs';
import { Form } from '../../../abstract/form.abstract';
import { RecordModel } from '../../../models/record.model';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [CommonModule, InputComponent, ModalLayoutComponent, ReactiveFormsModule],
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent extends Form {
  private dialogRef = inject(MatDialogRef<EditUserDialogComponent>);
  private fb = inject(FormBuilder);
  private recordService = inject(RecordService);
  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public record: RecordModel
  ) {
    super();
    this.formGroup = this.fb.group({
      id: [this.record.id],
      name: [this.record.name, [Validators.required, Validators.min(2)]],
      surname: [this.record.surname, [Validators.required, Validators.min(2)]],
      email: [this.record.email, [Validators.required, Validators.email]],
      phone: [this.record.phone, [phoneValidator()]]
    });
  }

  onConfirm(): void {
    this.submit();
  }

  onCancel(): void {
    this.dialogRef.close();
  }


  prepareRequest(): Observable<any> {
    const data = this.formGroup.getRawValue();
    return this.recordService.updateRecord(data);
  }

  override onRequestSuccess(value: any) {
    super.onRequestSuccess(value);
    this.dialogRef.close(value);
  }
}
