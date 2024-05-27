import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordModel } from '../../core/models/record.model';
import { RecordTableComponent } from '../../core/components/block/record-table/record-table.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [RecordTableComponent],
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit, OnDestroy {
  records: RecordModel[] = [];
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(({ records }) => {
      this.records = records;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
