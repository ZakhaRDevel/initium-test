import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-triangle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-triangle.component.svg',
})
export class IconTriangleComponent {
  @Input() width: number = 8;
  @Input() height: number = 6;
}
