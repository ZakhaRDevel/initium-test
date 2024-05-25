import { animate, style, transition, trigger } from '@angular/animations';

export function fadeInEnter(duration: string) {
    return trigger('fadeInEnter', [
        transition(':enter', [
          style({ opacity: 0, maxHeight: '0' }),
          animate(duration, style({ opacity: 1, maxHeight: '100px' }))
        ]),
        transition(':leave', [
          style({ opacity: 1, maxHeight: '100px' }),
          animate(duration, style({ opacity: 0, maxHeight: '0' }))
        ])
    ]);
}
