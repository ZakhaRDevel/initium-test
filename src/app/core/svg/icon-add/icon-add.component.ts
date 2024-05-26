import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-add.component.svg'
})
export class IconAddComponent {
  @Input() width: number = 20;
  @Input() height: number = 20;
}
