import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { EMPTY, catchError, of, take } from 'rxjs';
import { RecordModel } from '../models/record.model';
import { RecordService } from '../services/record.service';
import { Router } from '@angular/router';

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
