import { Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../../services/svg.service';

@Component({
  selector: 'app-icon',
  standalone: true,
  styleUrls: ['./icon.component.scss'],
  templateUrl: './icon.component.html',
  encapsulation: ViewEncapsulation.None
})
export class IconComponent implements OnInit {
  private svgService = inject(SvgService);
  @Input() src: string;
  svgIcon: SafeHtml;


  ngOnInit() {
    this.svgService.getSvg(this.src).subscribe(svg => {
      this.svgIcon = svg;
    });
  }
}
