import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { EMPTY, mergeMap, of, take } from 'rxjs';
import { RecordModel } from '../models/record.model';
import { RecordService } from '../services/record.service';

export const recordsResolver: ResolveFn<RecordModel[]> = (route, state) => {
    const recordService = inject(RecordService);
    return recordService.getRecords().pipe(
        take(1),
        mergeMap((data) => {
            return data ? of(data) : EMPTY;
        })
    );
};
