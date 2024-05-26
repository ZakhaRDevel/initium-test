import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordModel } from '../../../models/record.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RecordService } from '../../../services/record.service';
import { ConfirmDeleteDialogComponent } from '../../modals/confirm-delete-dialog/confirm-delete-dialog.component';
import { CreateUserDialogComponent } from '../../modals/create-user-dialog/create-user-dialog.component';
import { EditUserDialogComponent } from '../../modals/edit-user-dialog/edit-user-dialog.component';
import { InputCheckboxComponent } from '../../inputs/input-checkbox/input-checkbox.component';
import { IconAddComponent } from '../../../svg/icon-add/icon-add.component';
import { IconDeleteComponent } from '../../../svg/icon-delete/icon-delete.component';
import { IconTriangleComponent } from '../../../svg/icon-triangle/icon-triangle.component';
import { LoadingService } from '../../../services/loading.service';

interface Column {
  field: string;
  label: string;
  align?: 'start' | 'center' | 'end';
}

@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    InputCheckboxComponent,
    IconAddComponent,
    IconDeleteComponent,
    IconTriangleComponent
  ]
})
export class RecordTableComponent {
  @Input() records: RecordModel[] = [];
  sortBy: string = '';
  sortOrder: string = '';
  selectedRecords: RecordModel[] = [];
  allSelected: boolean = false;
  columns: Column[] = [
    { field: 'name', label: 'Имя' },
    { field: 'surname', label: 'Фамилия' },
    { field: 'email', label: 'E-mail', align: 'end' },
    { field: 'phone', label: 'Телефон', align: 'end' }
  ];
  private recordService = inject(RecordService);
  private dialog = inject(MatDialog);
  private loadingService = inject(LoadingService);

  getHeaderCheckboxState(): 'unchecked' | 'checked' | 'indeterminate' {
    if (this.allSelected) {
      return 'checked';
    } else if (this.selectedRecords.length > 0) {
      return 'indeterminate';
    } else {
      return 'unchecked';
    }
  }

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
        this.loadingService.show();
        this.recordService.deleteRecords(ids).subscribe(() => {
          this.fetchRecords();
          this.loadingService.hide();
        }, () => {
          this.loadingService.hide();
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
        this.fetchRecords();
      }
    });
  }

  fetchRecords(): void {
    const filters = { sortBy: this.sortBy, order: this.sortOrder };
    this.loadingService.show();
    this.recordService.getRecords(filters).subscribe(data => {
      this.records = data;
      this.selectedRecords = [];
      this.allSelected = false;
      this.loadingService.hide();
    }, () => {
      this.loadingService.hide();
    });
  }

  openCreateUserDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchRecords();
      }
    });
  }

  onSort(column: string): void {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    this.fetchRecords();
  }
}
