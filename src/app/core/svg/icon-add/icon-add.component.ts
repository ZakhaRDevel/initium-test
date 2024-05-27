import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-add',
  standalone: true,
  templateUrl: './icon-add.component.svg'
})
export class IconAddComponent {
  @Input() width: number = 20;
  @Input() height: number = 20;
}
