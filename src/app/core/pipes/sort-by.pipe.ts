import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(array: any[], field: string, sortOrder: 'asc' | 'desc'): any[] {
    if (!Array.isArray(array) || !field) {
      return array;
    }

    array.sort((a: any, b: any) => {
      let valueA = a[field];
      let valueB = b[field];

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
      }
      if (typeof valueB === 'string') {
        valueB = valueB.toLowerCase();
      }

      let comparison = 0;
      if (valueA > valueB) {
        comparison = 1;
      } else if (valueA < valueB) {
        comparison = -1;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return array;
  }
}
