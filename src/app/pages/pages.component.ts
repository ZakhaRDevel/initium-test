import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecordModel } from '../core/models/record.model';
import { RecordService } from '../core/services/record.service';
import { RecordTableComponent } from '../core/components/block/record-table/record-table.component';

@Component({
    selector: 'app-pages',
    standalone: true,
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
    imports: [CommonModule, RecordTableComponent]
})
export class PagesComponent implements OnInit {
    private recordService = inject(RecordService);
    private route = inject(ActivatedRoute);
    records: RecordModel[] = [];

    ngOnInit(): void {
        this.route.data.subscribe(({ records }) => {
            this.records = records;
        });
    }
}
