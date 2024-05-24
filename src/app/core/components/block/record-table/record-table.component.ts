import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordModel } from '../../../models/record.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { RecordService } from '../../../services/record.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../modals/confirm-delete-dialog/confirm-delete-dialog.component';
import { CreateUserDialogComponent } from '../../modals/create-user-dialog/create-user-dialog.component';
import { EditUserDialogComponent } from '../../modals/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class RecordTableComponent {
  @Input() records: RecordModel[] = [];
  @Output() addRecord = new EventEmitter<void>();
  @Output() deleteRecords = new EventEmitter<RecordModel[]>();
  private recordService = inject(RecordService);
  private dialog = inject(MatDialog);
  displayedColumns: string[] = [
    'select',
    'name',
    'surname',
    'email',
    'phone'
  ];
  selectedRecords: RecordModel[] = [];
  allSelected: boolean = false;

  toggleAllSelection(): void {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.selectedRecords = [...this.records];
    } else {
      this.selectedRecords = [];
    }
  }

  onToggleSelection(record: RecordModel): void {
    const index = this.selectedRecords.indexOf(record);
    if (index > -1) {
      this.selectedRecords.splice(index, 1);
    } else {
      this.selectedRecords.push(record);
    }
    this.allSelected = this.selectedRecords.length === this.records.length;
  }


  onDeleteRecords(): void {
    if (this.selectedRecords.length === 0) {
      console.warn('Нет выбранных записей для удаления.');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { count: this.selectedRecords.length }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const ids = this.selectedRecords.map(record => record.id);
        this.recordService.deleteRecords(ids).subscribe(() => {
          this.fetchRecords();
        });
      }
    });
  }

  onEditRecord(record: RecordModel): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: record
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchRecords(); // Перезагружаем данные после редактирования
      }
    });
  }

  fetchRecords(): void {
    this.recordService.getRecords().subscribe((records) => {
      this.records = records;
      this.selectedRecords = [];
      this.allSelected = false;
    });
  }

  openCreateUserDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent);

    dialogRef.afterClosed().subscribe(result=> {
      if(result.success) {
        this.fetchRecords();
      }
    })
  }
}
