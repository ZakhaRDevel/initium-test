import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-delete',
  standalone: true,
  templateUrl: './icon-delete.component.svg'
})
export class IconDeleteComponent {
  @Input() width: number = 22;
  @Input() height: number = 20;
}
