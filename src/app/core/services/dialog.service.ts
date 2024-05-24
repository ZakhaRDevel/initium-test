import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private matDialog = inject(MatDialog);

  openModal<T, R = any>(component: ComponentType<T>, config?: MatDialogConfig<R>): MatDialogRef<T, R> {
    return this.matDialog.open(component, config);
  }
}
