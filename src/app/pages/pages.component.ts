import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordTableComponent } from '../core/components/block/record-table/record-table.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-pages',
    standalone: true,
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
  imports: [CommonModule, RecordTableComponent, RouterOutlet]
})
export class PagesComponent {

}
