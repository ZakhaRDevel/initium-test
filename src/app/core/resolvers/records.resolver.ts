import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, EMPTY, take } from 'rxjs';
import { RecordModel } from '../models/record.model';
import { RecordService } from '../services/record.service';

export const recordsResolver: ResolveFn<RecordModel[]> = (route, state) => {
  const recordService = inject(RecordService);
  const router = inject(Router);

  return recordService.getRecords().pipe(
    take(1),
    catchError((error) => {
      console.error('Ошибка при загрузке данных:', error);
      router.navigate(['/error']);
      return EMPTY;
    })
  );
};
