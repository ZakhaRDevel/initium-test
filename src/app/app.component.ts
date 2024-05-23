import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RecordService } from './core/services/record.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  recordService = inject(RecordService);
  title = 'initium-test';

  ngOnInit(): void {
    this.recordService.getRecords().subscribe((res) => {
      console.log(res);
    });
  }
}
