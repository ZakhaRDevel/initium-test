import { Component, Inject, inject, Input } from '@angular/core';
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
  selector: 'app-user-dialog',
  standalone: true,
  imports: [CommonModule, InputComponent, ModalLayoutComponent, ReactiveFormsModule],
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent extends Form {
  @Input() isEdit: boolean = false;
  formGroup: FormGroup;
  private dialogRef = inject(MatDialogRef<UserDialogComponent>);
  private fb = inject(FormBuilder);
  private recordService = inject(RecordService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public record: RecordModel
  ) {
    super();
    this.formGroup = this.fb.group({
      id: [this.record?.id || null],
      name: [this.record?.name || null, [Validators.required, Validators.min(2)]],
      surname: [this.record?.surname || null, [Validators.required, Validators.min(2)]],
      email: [this.record?.email || null, [Validators.required, Validators.email]],
      phone: [this.record?.phone || null, [phoneValidator()]]
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
    if (this.isEdit) {
      return this.recordService.updateRecord(data);
    } else {
      return this.recordService.addRecord(data);
    }
  }

  override onRequestSuccess(value: any) {
    super.onRequestSuccess(value);
    this.dialogRef.close(value);
  }
}
