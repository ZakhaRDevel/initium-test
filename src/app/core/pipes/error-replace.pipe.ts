import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'errorReplace'
})
export class ErrorReplacePipe implements PipeTransform {

  transform(value: string, patternType: string = 'default') {
    switch (value) {
      case 'required':
        return 'Обязательное для заполнения';
      case 'email':
        return 'Некорректный адрес';
      case 'min':
        return 'Минимальное количество символов: 2';
      case 'invalidPhone':
        return 'Некорректный номер телефона';
    }
    return value;
  }
}
