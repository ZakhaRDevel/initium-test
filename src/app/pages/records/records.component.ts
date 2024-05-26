import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecordModel } from '../../core/models/record.model';
import { RecordTableComponent } from '../../core/components/block/record-table/record-table.component';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule, RecordTableComponent],
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
