import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecordModel } from '../../core/models/record.model';
import { RecordTableComponent } from '../../core/components/block/record-table/record-table.component';
import { IconComponent } from '../../core/components/ui/icon/icon.component';
import { InputCheckboxComponent } from '../../core/components/inputs/input-checkbox/input-checkbox.component';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule, RecordTableComponent, IconComponent, InputCheckboxComponent],
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  records: RecordModel[] = [];
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.data.subscribe(({ records }) => {
      this.records = records;
    });
  }
}
