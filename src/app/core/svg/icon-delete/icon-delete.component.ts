import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-delete.component.svg'
})
export class IconDeleteComponent {
  @Input() width: number = 22;
  @Input() height: number = 20;
}
