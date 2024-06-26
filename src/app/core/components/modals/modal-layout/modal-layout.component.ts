import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  encapsulation: ViewEncapsulation.None
})
export class ModalLayoutComponent {
  @Input() title: string = '';
  @Input() confirmButtonText: string = 'OK';
  @Input() isFormValid: boolean = true;

  @Input() confirmAction!: () => void;

  @Input() cancelAction!: () => void;

  onCancel(): void {
    this.cancelAction();
  }

  onConfirm(): void {
    this.confirmAction();
  }
}
