import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordModel } from '../../models/record.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

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
        MatIconModule
    ]
})
export class RecordTableComponent {
    @Input() records: RecordModel[] = [];
    @Output() addRecord = new EventEmitter<void>();
    @Output() deleteRecords = new EventEmitter<RecordModel[]>();

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

    onAddRecord(): void {
        this.addRecord.emit();
    }

    onDeleteRecords(): void {
        this.deleteRecords.emit(this.selectedRecords);
    }

    editRecord(record: RecordModel): void {}

    deleteRecord(record: RecordModel): void {
        const index = this.records.indexOf(record);
        if (index > -1) {
            this.records.splice(index, 1);
        }
        this.onToggleSelection(record);
    }
}
