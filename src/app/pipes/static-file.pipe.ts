import { inject, Pipe, PipeTransform, Signal } from '@angular/core';
import { SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { SafePipe } from './safe.pipe';

@Pipe({name: 'staticFile'})

export class StaticFilePipe implements PipeTransform {
    private downloadPath = '/file/';
    private readonly safeUrl = inject(SafePipe);
    transform(value: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl | null {
        if (value) {
          let mainPath: string = `${environment.api_url}${this.downloadPath}${value}`;
              return this.safeUrl.transform(`${mainPath}`, 'url');
          }
        return null;
    }
}
