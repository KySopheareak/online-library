import { inject, Pipe, PipeTransform, signal, Signal } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeScript,
  SafeStyle,
  SafeUrl,
} from '@angular/platform-browser';

type SafeType = 'html' | 'style' | 'script' | 'url' | 'resourceUrl';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(
    value: string,
    type: SafeType
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    const sanitizedValue = this.getSanitizedValue(value, type);
    return sanitizedValue;
  }

  private getSanitizedValue(
    value: string,
    type: SafeType
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
