// svg.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SvgService {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  getSvg(url: string): Observable<SafeHtml> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(svg => this.sanitizer.bypassSecurityTrustHtml(svg))
    );
  }
}
