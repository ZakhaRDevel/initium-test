import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-triangle',
  standalone: true,
  templateUrl: './icon-triangle.component.svg',
})
export class IconTriangleComponent {
  @Input() width: number = 8;
  @Input() height: number = 6;
}
