import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  calculateColor(color: string, direction: 'lighten' | 'darken') {
    let h: any = this.hexToHSL(color)[0];
    let s: any = this.hexToHSL(color)[1];
    let l: any = this.hexToHSL(color)[2];

    let lighter = l / 0.75 > 100 ? 100 : l / 0.75;
    let darker = l * 0.75 > 100 ? 100 : l * 0.75;

    if (direction === 'lighten') {
      return 'hsl(' + h + ',' + s + '%,' + lighter + '%)';
    }
    if (direction === 'darken') {
      return 'hsl(' + h + ',' + s + '%,' + darker + '%)';
    }
    return color[4];
  }

  hexToHSL(H: string) {
    // Convert hex to RGB first
    let r: any = 0,
      g: any = 0,
      b: any = 0;
    if (H.length == 4) {
      r = '0x' + H[1] + H[1];
      g = '0x' + H[2] + H[2];
      b = '0x' + H[3] + H[3];
    } else if (H.length == 7) {
      r = '0x' + H[1] + H[2];
      g = '0x' + H[3] + H[4];
      b = '0x' + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l, 'hsl(' + h + ',' + s + '%,' + l + '%)'];
  }

  toCamelCase(str: string) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }
}
