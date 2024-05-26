import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    <mat-progress-bar *ngIf="isLoading$ | async" mode="indeterminate" color="primary"></mat-progress-bar>
  `,
  styleUrls: ['./loading-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingBarComponent {
  private loadingService = inject(LoadingService);
  isLoading$ = this.loadingService.isLoading$;
}
