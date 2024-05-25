import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecordModel } from '../core/models/record.model';
import { RecordService } from '../core/services/record.service';
import { RecordTableComponent } from '../core/components/block/record-table/record-table.component';
import { IconComponent } from '../core/components/ui/icon/icon.component';
import { InputComponent } from '../core/components/inputs/input/input.component';

@Component({
    selector: 'app-pages',
    standalone: true,
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
  imports: [CommonModule, RecordTableComponent, IconComponent, InputComponent]
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
