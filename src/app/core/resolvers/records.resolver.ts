import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, EMPTY, finalize, take } from 'rxjs';
import { RecordModel } from '../models/record.model';
import { RecordService } from '../services/record.service';
import { LoadingService } from '../services/loading.service';

export const recordsResolver: ResolveFn<RecordModel[]> = (route, state) => {
  const recordService = inject(RecordService);
  const router = inject(Router);
  const loadingService = inject(LoadingService);

  loadingService.show();

  return recordService.getRecords().pipe(
    take(1),
    catchError((error) => {
      console.error('Ошибка при загрузке данных:', error);
      router.navigate(['/error']);
      return EMPTY;
    }),
    finalize(() => {
      // loadingService.hide();
    })
  );
};
